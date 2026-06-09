export async function getRecommendation(req, res) {
  try {
    const userEmail = req.user?.email || 'aluno@nous.app';

    const apexUrl = `https://oracleapex.com/ords/nous/nous-api/recommendation?user_email=${encodeURIComponent(userEmail)}`;

    const response = await fetch(apexUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Origin: 'https://oracleapex.com',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    const text = await response.text();

    if (!response.ok) {
      return res.status(response.status).json({
        message: 'Erro ao consultar Oracle APEX.',
        details: text,
      });
    }

    const data = JSON.parse(text);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: 'Falha ao buscar recomendação no Oracle APEX.',
      error: error.message,
    });
  }
}