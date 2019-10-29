<template>
  <div class="checkout">
    <my-nav></my-nav>
    <div class="container mt-5 pt-5">
        <div class="row">
            <div class="col-md-9">
                <h4>CHECKOUT PAGE</h4>
                <ul>
                    <li v-for="item in this.$store.state.cart">
                    <img :src="item.productImage" width="80px" alt="">
                   {{ item.productName }}
                    {{ item.productAmount }}個
                    </li>
                </ul>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
    
}
</script>
