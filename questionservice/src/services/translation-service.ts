import axios from 'axios';

export const getTranslatedQuestions = async (
  questionsArray: any,
  language: any
) => {
  /*
  The idea of this is to transform the questions array to this
  "QUESTION[ANSWER]ANSWER]ANSWER]ANSWER]|QUESTION[ANSWER]ANSWER]ANSWER]ANSWER]"
  So the number of requests to the API is the minimum and with the minimum number of
  chars spent
  */
  const text = questionsArray
    .map((questionElement: any) => {
      const { question, answers } = questionElement;
      const answersRepresentation = answers
        .map(({ text }: any) => text)
        .join(']');

      return `${question}[${answersRepresentation}`;
    })
    .join('|');

  const options = {
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
      'X-RapidAPI-Key': 'c30d4bcd50msh89a1aa813730fe6p167ffbjsn236010b9270f',
      'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
    },
    data: [
      {
        Text: text,
      },
    ],
  };

  const response = await axios.request(options);

  if (response.status !== 200) {
    throw new Error('Error while translating');
  }

  const arr: any[] = [];

  response.data[0].translations[0].text.split('|').forEach((question: any) => {
    const [questionPart, answersPart] = question.split('[');

    arr.push({
      question: questionPart,
      answers: answersPart.split(']').map((answer: any, i: number) => ({
        id: i + 1,
        text: answer,
      })),
    });
  });

  console.log(arr);

  return arr;
};
