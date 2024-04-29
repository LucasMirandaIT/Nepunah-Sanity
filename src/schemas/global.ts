import { defineField, defineType } from 'sanity'

const customRequired = (value, context, differentFrom) => {
  if (context.document.title === differentFrom && !value) {
    return `This field is required when the title is "${differentFrom}"`;
  }
  return true;
}
const altRequired = (value, context) => {
  if (context.document.title === 'header' && context.document.appLogo && !value) {
    return `This field is required when you have a logo uploaded"`;
  }
  return true;
}

export default defineType({
  name: 'global',
  title: 'Global (Cabeçalho, Rodapé, ...)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      options: {
        list: [
          { title: 'Cabeçalho (Header)', value: 'header' },
          { title: 'Rodapé (Footer)', value: 'footer' },
          { title: 'Informações de Contato', value: 'contact' },
        ],
      },
    }),
    defineField({
      name: 'appLogo',
      title: 'Logo da aplicação',
      type: 'image',
      hidden: ({document}) => document.title !== 'header'
    }),
    defineField({
      name: 'logoAltText',
      title: 'Texto de Acessibilidade para o logo',
      type: 'string',
      hidden: ({document}) => document.title !== 'header',
      validation: (rule: any) => rule.custom((value, context) => altRequired(value, context)),
    }),
    defineField({
      name: 'appTitle',
      title: 'Título da Aplicação',
      type: 'string',
      hidden: ({document}) => document.title !== 'header' && document.title !== 'footer',
    }),

    defineField({
      name: 'socialMedia',
      title: 'Redes Sociais',
      type: 'object',
      hidden: ({document}) => document.title !== 'header',
      fields: [
        defineField({
          name: 'facebook',
          title: 'URL do Facebook',
          type: 'string',
        }),
        
        defineField({
          name: 'instagram',
          title: 'URL do Instagram',
          type: 'string',
        }),
        
        defineField({
          name: 'whatsapp',
          title: 'URL do Whatsapp',
          type: 'string',
        }),
      ]
    }),
    defineField({
      name: 'email',
      title: 'E-mail',
      type: 'string',
      hidden: ({document}) => document.title !== 'contact',
      validation: (rule: any) => rule.custom((value, context) => customRequired(value, context, 'contact')),
    }),
    defineField({
      name: 'phone',
      title: 'Telefone',
      type: 'string',
      hidden: ({document}) => document.title !== 'contact',
      validation: (rule: any) => rule.custom((value, context) => customRequired(value, context, 'contact')),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})
