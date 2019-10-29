<template>
    <div class="products">
        <div class="products" id="products">
            <div class="container">
                <h1 class="text-center p-5">Ourt Products List</h1>
                <div class="row">
                    <div class="col-md-4" v-for="(product,index) in products" :key="index">
                        <div class="card product item">
                            <carousel :perPage="1">
                                <slide v-for="(img, index) in product.images" :key="index">
                                    <img :src="img" class="card-img-top">
                                </slide>
                            </carousel>
                            <div class="card-body">
                                <h5 class="card-title">{{ product.name }}</h5>
                                <h5 class="card-price">{{ product.price }}</h5>
                                <p class="card-text" v-html="product.description"></p>
                                <!-- 使用按鈕組件 -->
                                <add-cart 
                                    :price="product.price"
                                    :p-id="product.id"
                                    :name="product.name"
                                    :image="getImage(product.images)">
                                </add-cart>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>

    
</template>

<script>
import { db } from '../firebase.js'

export default {
    name: 'Products-List',
    props: {
        msg: String
    },
    data(){
        return {
            products:[],
        }
    },
    firestore(){
        return {
            products: db.collection('products')
        }
    },
    methods:{
        //選擇第一張主圖
        getImage(imgs){
            return imgs[0]
        }
    }
}
</script>