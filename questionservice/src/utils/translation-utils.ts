import axios from 'axios';

export async function performTranslationRequestWithOptions(options: any) {
  return await axios.request(options);
}
