<template>
    <div>
        <!-- Modal -->
        <div class="modal fade" id="cartWindow" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">MY CART</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                <ul>
                    <li v-for="item in this.$store.state.cart">
                    {{ item.productName }}
                    {{ item.productAmount }}個
                    </li>
                </ul>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">繼續購物</button>
                <button type="button" class="btn btn-primary">完成訂單</button>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>