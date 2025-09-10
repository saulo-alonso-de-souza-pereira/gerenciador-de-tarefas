
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

exports.updateTask = functions.https.onCall(async (data, context) => {
  // 1. Verifique se o usuário é admin usando o custom claim
  if (!context.auth || context.auth.token.isAdmin !== true) {
    throw new functions.https.HttpsError('permission-denied', 'Apenas administradores podem editar tarefas.');
  }

  const { taskId, updatedData } = data;
  try {
    const taskRef = admin.firestore().collection('tarefas').doc(taskId);
    await taskRef.update(updatedData);
    return { success: true };
  } catch (error) {
    throw new functions.https.HttpsError('internal', 'Erro ao editar a tarefa.');
  }
});

exports.updateUserProfile = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    // Verifique se a requisição é um método POST
    if (req.method !== 'POST') {
      return res.status(405).send('Método não permitido.');
    }

    // A requisição de pré-verificação (OPTIONS) é tratada pelo cors()
    // mas se o método for OPTIONS e a origem for aceita, ele continuará.

    // 1. Verificação de permissão: Apenas o administrador pode atualizar outros perfis.
    const tokenId = req.headers.authorization.split('Bearer ')[1];
    try {
      const decodedToken = await admin.auth().verifyIdToken(tokenId);
      if (decodedToken.isAdmin !== true) {
        return res.status(403).send('Apenas administradores podem atualizar perfis.');
      }
    } catch (error) {
      return res.status(401).send('Não autorizado.');
    }

    // 2. Extraia o UID e o novo displayName do corpo da requisição
    const { uid, displayName } = req.body;
    if (!uid || !displayName) {
      return res.status(400).send('O UID do usuário e o novo nome são obrigatórios.');
    }

    try {
      // 3. Use o método updateUser para alterar o displayName.
      await admin.auth().updateUser(uid, { displayName: displayName });
      return res.status(200).json({ message: `Perfil do usuário ${uid} atualizado com sucesso.` });
    } catch (error) {
      console.error("Erro ao atualizar o perfil do usuário:", error);
      return res.status(500).send('Erro ao atualizar o perfil. Tente novamente.');
    }
  });
});