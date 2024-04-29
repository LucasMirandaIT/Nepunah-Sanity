import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import global from './global'
import page from './page'
import reflectionText from './reflection-text'
import therapy from './therapy'

export const schemaTypes = [global, page, therapy, reflectionText, blockContent]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [global, page, therapy, reflectionText, blockContent],
}
