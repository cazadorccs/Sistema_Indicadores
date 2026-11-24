import { test, describe } from 'node:test';
import assert from 'node:assert';
import { MerkleService } from '../../backend/services/merkleService';

describe('Suites de Criptografía Forense: Árboles de Merkle RFC 6962', () => {

  const hojasReporte = [
    'INDICADOR:IEC:84.2:SEMANA_35',
    'INDICADOR:IRT:96.1:SEMANA_35',
    'INDICADOR:ICD:72.8:SEMANA_35',
    'INDICADOR:EE:8.7:SEMANA_35',
    'INDICADOR:IBS:34.5:SEMANA_35',
    'INDICADOR:TRMD:42:SEMANA_35',
    'INDICADOR:IAAE:91.0:SEMANA_35',
    'INDICADOR:IVI:0.180:SEMANA_35'
  ];

  test('Determinismo: El mismo conjunto de hojas produce exactamente la misma raíz Merkle', () => {
    const tree1 = MerkleService.buildTree(hojasReporte);
    const tree2 = MerkleService.buildTree(hojasReporte);

    assert.strictEqual(tree1.root.length, 64, 'La raíz Merkle debe ser un hash de 64 caracteres');
    assert.strictEqual(tree1.root, tree2.root, 'Dos construcciones idénticas deben producir la misma raíz');
    assert.strictEqual(tree1.totalLeaves, 8);
  });

  test('Separación de Dominios RFC 6962: Las hojas usan 0x00 y los nodos 0x01', () => {
    const hojaHash = MerkleService.hashLeaf('TEST_DATA');
    const nodoHash = MerkleService.hashChildren(hojaHash, hojaHash);

    assert.notStrictEqual(
      hojaHash.toString('hex'), 
      nodoHash.toString('hex'), 
      'El hash de hoja y el hash de nodo no deben colisionar gracias a los prefijos 0x00 y 0x01'
    );
  });

  test('Generación y Verificación de Pruebas de Inclusión (Merkle Audit Path)', () => {
    const tree = MerkleService.buildTree(hojasReporte);

    // Verificar cada una de las 8 hojas
    for (let i = 0; i < hojasReporte.length; i++) {
      const hoja = hojasReporte[i];
      const proof = MerkleService.getProof(tree, i);

      const isValid = MerkleService.verifyProof(hoja, proof, tree.root);
      assert.strictEqual(isValid, true, `La prueba de inclusión para la hoja #${i} (${hoja}) debe ser válida`);
    }
  });

  test('Detección Forense de Adulteración: Un dato manipulado invalida la prueba de inclusión', () => {
    const tree = MerkleService.buildTree(hojasReporte);
    const proofHoja0 = MerkleService.getProof(tree, 0);

    // Intentar verificar con un dato adulterado (ej: cambiar 84.2 por 84.3)
    const datoAdulterado = 'INDICADOR:IEC:84.3:SEMANA_35';
    const isValid = MerkleService.verifyProof(datoAdulterado, proofHoja0, tree.root);

    assert.strictEqual(isValid, false, 'Un dato adulterado debe ser rechazado matemáticamente');
  });

  test('Manejo robusto de árbol con número impar de hojas', () => {
    const hojasImpares = ['HOJA_1', 'HOJA_2', 'HOJA_3'];
    const tree = MerkleService.buildTree(hojasImpares);

    assert.ok(tree.root);
    assert.strictEqual(tree.root.length, 64);

    const proof = MerkleService.getProof(tree, 2);
    const isValid = MerkleService.verifyProof('HOJA_3', proof, tree.root);
    assert.strictEqual(isValid, true, 'La prueba debe ser válida incluso en árboles con hojas impares');
  });
});
