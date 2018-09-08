<template>
    <section class='pictures'>
        <Picture
            v-for='picture in pictures'
            :key='picture.id'
            :thumbnail='picture.thumbnail'
            :title='picture.title'
            :id='picture.id'
            :previewText='picture.previewText' />
    </section>
    
</template>

<script>
import Picture from '@/components/Picture'

export default {
    components: {
        Picture
    },
    asyncData () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    pictures: [
                        {
                            id: '1',
                            title: 'Delicious Many',
                            thumbnail: 'https://www.incimages.com/uploaded_files/image/970x450/getty_855098134_353411.jpg',
                            previewText: 'Awesome Many!'
                        },
                        {
                            id: '2',
                            title: 'Delicious Mac',
                            thumbnail: 'https://www.mcdonalds.com/content/dam/usa/documents/mcdelivery/mcdelivery_new11.jpg',
                            previewText: 'Awesome Mac!'
                        },
                        {
                            id: '3',
                            title: 'Delicious Mac',
                            thumbnail: 'https://www.mcdonalds.com/content/dam/usa/documents/mcdelivery/mcdelivery_new11.jpg',
                            previewText: 'Awesome Mac!'
                        },
                        {
                            id: '4',
                            title: 'Delicious Mac',
                            thumbnail: 'https://www.mcdonalds.com/content/dam/usa/documents/mcdelivery/mcdelivery_new11.jpg',
                            previewText: 'Awesome Mac!'
                        },
                        {
                            id: '5',
                            title: 'Delicious Mac',
                            thumbnail: 'https://www.mcdonalds.com/content/dam/usa/documents/mcdelivery/mcdelivery_new11.jpg',
                            previewText: 'Awesome Mac!'
                        },
                        {
                            id: '6',
                            title: 'Delicious Mac',
                            thumbnail: 'https://www.mcdonalds.com/content/dam/usa/documents/mcdelivery/mcdelivery_new11.jpg',
                            previewText: 'Awesome Mac!'
                        },
                        {
                            id: '7',
                            title: 'Delicious Mac',
                            thumbnail: 'https://www.mcdonalds.com/content/dam/usa/documents/mcdelivery/mcdelivery_new11.jpg',
                            previewText: 'Awesome Mac!'
                        },
                        {
                            id: '8',
                            title: 'Delicious Mac',
                            thumbnail: 'https://www.mcdonalds.com/content/dam/usa/documents/mcdelivery/mcdelivery_new11.jpg',
                            previewText: 'Awesome Mac!'
                        }
                    ]
                })
            }, 100)
        })
    }
}
</script>


<style scoped>
.pictures{
    display: flex;
    flex-flow: row wrap;
}
</style>

