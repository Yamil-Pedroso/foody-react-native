export default {
    name: 'featured',
    title: 'Featured menu categories',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name of the featured category',
            type: 'string',
            validation: Rule => Rule.required(),
        },
        {
            name: 'short_description',
            title: 'Short description of the featured category',
            type: 'string',
            validation: Rule => Rule.required(),
        },
        {
            name: 'restaurants',
            title: 'Restaurants',
            type: 'array',
            of: [{type: 'reference', to: {type: 'restaurant'}}],
        }
    ]
}
