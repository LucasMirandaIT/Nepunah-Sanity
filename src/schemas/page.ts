import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Páginas',
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
      name: 'submenus',
      title: 'Possui submenus?',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'submenusOrigin',
      title: 'Origem dos submenus',
      type: 'string',
      hidden: ({document}) => !document.submenus
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
              name: 'alt',
              type: 'string',
              title: 'Descrição (Acessibilidade)'
            },
          ]
        },
      ],
      hidden: ({document}) => !!document.submenus
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
