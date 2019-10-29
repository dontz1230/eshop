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
                <button @click="addNew" class="btn btn-primary">Add Product</button>    
            </div>
        </div>

        <div class="datas" v-for="(singleP,index) in products" :key="index">
            <div>
                名稱：{{ singleP.name }} 
                <span>價錢：{{ singleP.price }} 元</span>
                ---
                <span @click="deleteProduct(singleP)"><i class="fa fa-times"></i></span>
                ---
                <span @click="editProduct(singleP)"> <i class="fas fa-pen"></i></span>
            </div>
        </div>

        <!-- Modal -->
<div class="modal fade" id="product" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
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
            <div class="form-group">
                <input type="text" @keyup.17="addTag" placeholder="tag" v-model="currenttag" class="form-control">
            </div>
            <div v-for="(tag,index) in product.tags" :key="index">
                <span>已新增標籤</span><span>{{ tag }}</span>
            </div>
            <div class="form-group">
                <vue-editor v-model="product.description" ></vue-editor>
            </div>
            <div class="form-group">
               <label for="product_image">Product Image</label>
               <input type="file" @change="uploadImage">
            </div>
            <div class="form-group">
               <div class="thumbnails" v-for="(image,index) in product.images" :key="index">
                 <img :src="image" width="80px">
                 <span>
                     <i class="fa fa-times" @click="deleteImage(image,index)"></i>
                 </span>
               </div>
            </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button @click="addProduct()" type="button" 
                v-if="modal == 'new'"
                class="btn btn-primary">確認新增</button>
        <button @click="updateProduct()" type="button" 
                v-if="modal == 'edit'"
                class="btn btn-primary">儲存變更</button>

      </div>
    </div>
  </div>
</div>
        
    </div>

    
</template>

<script>
import { fb,db } from '../firebase.js'
import { VueEditor } from 'vue2-editor'

export default {
    name: 'Products',
    components:{
        VueEditor
    },
    data(){
        return {
            editState: false,
            activeItemId: null,
            value: null,
            products:[],
            product:{
                name:null,
                price:null,
                description:null,
                tags:[],
                images:[]
            },
            modal: null,
            currenttag: null
        }
    },
    firestore(){
        return {
            products: db.collection('products')
        }
    },
    computed:{
        computedTag(){
            return this.product.tags
        }
    },
    methods:{
        resetProducts(){
            this.product = {
                name:null,
                description:null,
                price:null,
                tags:[],
                images:[]
            }
        },
        addNew(){
            this.modal = 'new'
            this.resetProducts();
            $('#product').modal('show');
        },
        addProduct(){
            this.$firestore.products.add(this.product);
            $('#product').modal('hide');
            
        },
        deleteProduct(doc){
            Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            if (result.value) {
                //刪除firebase中的資料
                this.$firestore.products.doc(doc.id).delete()
                Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
                )
            }
})
        },
        
        editProduct(product){
            this.product = product 
            this.modal = 'edit'
            $('#product').modal('show');
        },
        updateProduct(){
            this.$firestore.products.doc(this.product.id).update(this.product)
            $('#product').modal('hide');
        },
        addTag(){
            this.product.tags.push(this.currenttag);
            this.currenttag = ''
            console.log(this.currenttag)
        },
        uploadImage(e){
            //check if we've uploaded img
            if(e.target.files[0]){
                let file = e.target.files[0]

                let storageRef = fb.storage().ref('products/' + file.name)
                
                //使用uploadTask才可以resume/cancel/get url/progress...
                let uploadTask = storageRef.put(file)

                uploadTask.on('state_changed', (snapshot) => {
                }, (error) => {
                    
                }, () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        this.product.images.push(downloadURL)
                        
                    })
                })
            }
        },
        deleteImage(img,index){
            let image = fb.storage().refFromURL(img);
            this.product.images.splice(index,1);
            image.delete().then(() => {
                console.log('img deleted')
            }).catch((error) => {
                console.log(error)
            })
        },
        onConfirm() {
            this.value = 'Agreed'
        },
        onCancel() {
            this.value = 'Disagreed'
      }
    }
}
</script>