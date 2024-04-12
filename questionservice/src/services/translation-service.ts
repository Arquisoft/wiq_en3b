import { performTranslationRequestWithOptions } from '../utils/translation-utils';

const API_KEY = process.env.TRANSLATION_KEY ?? '***';

export const getTranslatedQuestions = async (
  questionsArray: any,
  language: any
) => {
  try {
    const translationPromises = questionsArray.map(async (question: any) => {
      const text = `${question.question}\\+\\${question.answers
        .map(({ text }: any) => text)
        .join('***')}`;
      return await performTranslationRequestWithOptions(
        getOptionsForTranslationRequest(language, text)
      );
    });

    const responses = await Promise.all(translationPromises);

    const arr: any[] = [];

    responses.forEach((response, i) => {
      const text = response.data[0].translations[0].text.split('\\+\\');
      console.log(text);
      const question = text[0];
      const answers = text[1].split('***');

      arr.push({
        question,
        answers: answers.map((answer: any, j: number) => ({
          id: questionsArray[i].answers[j].id,
          text: answer.trim(),
        })),
      });
    });

    console.log(arr);

    return arr;
  } catch (err) {
    console.log(err);
    throw new Error('Error while translating');
  }
};

const getOptionsForTranslationRequest = (language: any, text: string) => ({
  method: 'POST',
  url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
  params: {
    'to[0]': language,
    'api-version': '3.0',
    profanityAction: 'NoAction',
    textType: 'plain',
  },
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
  },
  data: [
    {
      Text: text,
    },
  ],
});
