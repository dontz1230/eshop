<template>
    <div class="products">
        <div class="product-test">
            <div class="form-group">
                <input type="text" placeholder="name" v-model="product.name" class="form-control">
            </div>
            <div class="form-group">
                <input type="text" placeholder="price" v-model="product.price" class="form-control">
            </div>
            <div class="form-group">
                <button @click="savedata" class="btn btn-primary">Save</button>    
            </div>
        </div>

        <div class="datas" v-for="(singleP,index) in allproducts" :key="index">
            <div>
                名稱：{{ singleP.data().name }} 
                <span>價錢：{{ singleP.data().price }} 元</span>
                ---
                <span @click="deleteProduct(singleP.id)"><i class="fa fa-times"></i></span>
                ---
                <span @click="editProduct(singleP)"> <i class="fas fa-pen"></i></span>
            </div>
        </div>

        <!-- Modal -->
<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="editModalLabel">Edit product</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <div class="form-group">
                <input type="text" placeholder="name" v-model="product.name" class="form-control">
            </div>
            <div class="form-group">
                <input type="text" placeholder="price" v-model="product.price" class="form-control">
            </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button @click="updateProduct()" type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
        
    </div>

    
</template>

<script>
import { fb,db } from '../firebase.js'
export default {
    name: 'Products',
    data(){
        return {
            editState: false,
            activeItemId: null,
            value: null,
            allproducts:[],
            product:{
                name:null,
                price:null
            }
        }
    },
    methods:{
        
        deleteProduct(productID){
            if(confirm('確定要刪除嗎？')){
                db.collection('products').doc(productID).delete()
                .then(()=> {
                    alert('商品已成功刪除')
                })
                .catch((err) => console.log(err))
            } else {

            }
        },

        readdata(){
            db.collection('products').get()
            .then((data) => {
            data.forEach((doc) => {
                this.allproducts.push(doc)
            })
        })
        },

        savedata(){
            db.collection('products').add(this.product)
            .then((docRef) =>{
                this.product.name = ''
                this.product.price = ''
                this.readdata()
            })
            .catch((err) => console.log(err))
        },

        editProduct(product){
            this.product = product.data()
            $('#editModal').modal('show');
            this.activeItemId = product.id
        },

        watcher(){
            db.collection('products').onSnapshot((querySnapshot) => {
                this.allproducts = [];
                querySnapshot.forEach((doc) => {
                    this.allproducts.push(doc)
                })
            })
        },

        updateProduct(){
            db.collection('products')
            .doc(this.activeItemId)
            .update(this.product)
            .then(() => {
                $('#editModal').modal('hide');
                this.watcher();
                console.log('更新成功')}
                )
            .catch((err) => console.log(err))
        },

        onConfirm () {
            this.value = 'Agreed'
        },
        onCancel() {
            this.value = 'Disagreed'
      }
    },
    created(){
        this.readdata();
    }
}
</script>