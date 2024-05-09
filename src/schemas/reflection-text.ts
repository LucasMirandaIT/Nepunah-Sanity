import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'reflection-text',
  title: 'Textos de Reflexão',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block'
        },
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Descrição (Acessibilidade)'
            },
            {
              title: 'Layout',
              name: 'layout',
              type: 'string',
              initialValue: 'image-only',
              options: {
                list: [
                  { title: 'Imagem', value: 'block' },
                  { title: 'Imagem | Texto', value: 'flex' },
                  { title: 'Texto | Imagem',  value: 'flex-reverse' },
                ],
              }
          },
          {
            name: 'text',
            title: 'text',
            type: 'array',
            of: [
              {type: 'block'}
            ],
            hidden: ({parent}) => parent.layout === 'block'
          },
          ]
        },
      ],
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
