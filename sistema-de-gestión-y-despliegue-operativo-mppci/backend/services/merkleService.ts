import crypto from 'node:crypto';

/**
 * Implementación Soberana de Árboles de Merkle bajo especificación RFC 6962
 * Garantiza integridad matemática, trazabilidad anti-repudio y pruebas de inclusión
 */
export class MerkleService {
  /**
   * Hashea una hoja con prefijo de dominio 0x00 para prevenir ataques de segunda preimagen (RFC 6962)
   */
  static hashLeaf(data: string | Buffer): Buffer {
    const bufferData = Buffer.isBuffer(data) ? data : Buffer.from(data, 'utf8');
    const leafPrefix = Buffer.from([0x00]);
    return crypto.createHash('sha256').update(Buffer.concat([leafPrefix, bufferData])).digest();
  }

  /**
   * Hashea dos nodos internos con prefijo de dominio 0x01 (RFC 6962)
   */
  static hashChildren(left: Buffer, right: Buffer): Buffer {
    const nodePrefix = Buffer.from([0x01]);
    return crypto.createHash('sha256').update(Buffer.concat([nodePrefix, left, right])).digest();
  }

  /**
   * Construye el Árbol de Merkle a partir de un conjunto de hojas de datos
   */
  static buildTree(leavesData: string[]): {
    root: string;
    levels: Buffer[][];
    totalLeaves: number;
  } {
    if (!leavesData || leavesData.length === 0) {
      const emptyHash = crypto.createHash('sha256').update('').digest('hex').toUpperCase();
      return { root: emptyHash, levels: [[]], totalLeaves: 0 };
    }

    // Nivel 0: Hojas con prefijo 0x00
    let currentLevel = leavesData.map(d => this.hashLeaf(d));
    const levels: Buffer[][] = [currentLevel];

    while (currentLevel.length > 1) {
      const nextLevel: Buffer[] = [];
      for (let i = 0; i < currentLevel.length; i += 2) {
        if (i + 1 < currentLevel.length) {
          nextLevel.push(this.hashChildren(currentLevel[i], currentLevel[i + 1]));
        } else {
          // Si el número de nodos es impar, se duplica el último nodo o se promueve
          nextLevel.push(this.hashChildren(currentLevel[i], currentLevel[i]));
        }
      }
      levels.push(nextLevel);
      currentLevel = nextLevel;
    }

    const rootHex = currentLevel[0].toString('hex').toUpperCase();
    return {
      root: rootHex,
      levels,
      totalLeaves: leavesData.length
    };
  }

  /**
   * Genera la prueba de inclusión (Merkle Audit Path) para una hoja específica
   */
  static getProof(
    tree: { levels: Buffer[][] },
    leafIndex: number
  ): Array<{ position: 'left' | 'right'; hash: string }> {
    const proof: Array<{ position: 'left' | 'right'; hash: string }> = [];
    let index = leafIndex;

    for (let level = 0; level < tree.levels.length - 1; level++) {
      const currentLevel = tree.levels[level];
      const isRightNode = index % 2 === 1;
      const siblingIndex = isRightNode ? index - 1 : index + 1;

      if (siblingIndex < currentLevel.length) {
        proof.push({
          position: isRightNode ? 'left' : 'right',
          hash: currentLevel[siblingIndex].toString('hex').toUpperCase()
        });
      } else {
        // En caso de duplicación por impar
        proof.push({
          position: 'right',
          hash: currentLevel[index].toString('hex').toUpperCase()
        });
      }

      index = Math.floor(index / 2);
    }

    return proof;
  }

  /**
   * Verifica matemáticamente que una hoja pertenece a la raíz Merkle
   */
  static verifyProof(
    leafData: string,
    proof: Array<{ position: 'left' | 'right'; hash: string }>,
    expectedRoot: string
  ): boolean {
    let currentHash = this.hashLeaf(leafData);

    for (const step of proof) {
      const siblingBuffer = Buffer.from(step.hash, 'hex');
      if (step.position === 'left') {
        currentHash = this.hashChildren(siblingBuffer, currentHash);
      } else {
        currentHash = this.hashChildren(currentHash, siblingBuffer);
      }
    }

    return currentHash.toString('hex').toUpperCase() === expectedRoot.toUpperCase();
  }
}
