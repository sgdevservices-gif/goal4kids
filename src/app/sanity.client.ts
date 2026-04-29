import { createClient } from '@sanity/client';
import { environment } from '../environments/environment';

export const sanityClient = createClient(environment.sanity);
