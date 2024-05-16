import getQuizletSet from '../../../utils/quizletFunctions';

export default async (req, res) => {
  const { setId } = req.query;
  const url = `https://quizlet.com/${setId}`;
  try {
    const data = await getQuizletSet(url);
    console.log(setId)
    res.setHeader('Cache-Control', 'public, max-age=0');
    res.status(200).json(data);
  } catch (error) {
    console.error('ERROR CAUGHT:', error);
    res.status(500).json({ error: error.message });
  }
};
