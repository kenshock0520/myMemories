<template>
    <section class='single-picture'>
        <h1>{{ picture.id }}</h1>
        <div>
            <img class='picture-image' :src='picture.thumbnail' :alt='picture.title'>
        </div>
        <p>{{ picture.descriptionText }}</p>
    </section>
</template>

<script>
export default {

    asyncData (context) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    picture: [
                        {
                            id: '1',
                            title: 'Delicious Many',
                            thumbnail: 'https://www.incimages.com/uploaded_files/image/970x450/getty_855098134_353411.jpg',
                            descriptionText: 'This is really a delicious meal!',
                            previewText: 'Awesome Many!'
                        },
                        {
                            id: '2',
                            title: 'Delicious Mac',
                            thumbnail: 'https://www.mcdonalds.com/content/dam/usa/documents/mcdelivery/mcdelivery_new11.jpg',
                            descriptionText: 'This is really a delicious meal!',
                            previewText: 'Awesome Mac!'
                        }
                    ].find(el => el.id === context.params.id)
                })
            }, 100)
        })
    }
}
</script>

<style>
.single-picture {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 30px;
}
.picture-image{
    width: 100%;
}
</style>
>
