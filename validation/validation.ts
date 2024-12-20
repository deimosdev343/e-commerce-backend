
import {z} from 'zod';

export const productValidation = z.object({
  name: z.string(),
  description: z.string(),
  image: z.string(),
  price: z.number()
});


