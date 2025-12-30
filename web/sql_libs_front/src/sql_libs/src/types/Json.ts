import { JsonLiteral } from './JsonLitelal';

export type Json = JsonLiteral | { [key: string]: Json } | Json[];
