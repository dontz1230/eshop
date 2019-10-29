<template>
    <div class="add-to-cart">
        <button class="btn btn-primary" @click="addToCart">Add to Card</button>
    </div>
</template>

<script>
export default {
    name: "add-cart",
    props:{
        name: String,
        price: String,
        image: String,
        pId: String
    },
    data(){
        return {
            item:{
                productName: this.name,
                productPrice: this.price,
                productImage: this.image,
                productAmount: 1,
                productID: this.pId
            }
        }
    },
    methods:{
        addToCart(){
            console.log(this.item)
            $('#cartWindow').modal('show')
            this.$store.commit('addToCart', this.item)
        }
    }
}
</script>