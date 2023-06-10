<template>
<div class="container-fluid">
    <div class="row justify-content-center m-3">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <router-link class="breadcrumb-item" to="/list">Home</router-link>
                <li class="breadcrumb-item active" aria-current="page">Library</li>
            </ol>
        </nav>
    </div>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <h3 class="text-center">Tambah Tamu</h3>
            <form @submit.prevent="onFormSubmit">
                <div class="mb-3 form-group">
                    <label class="mb-2">Nama</label>
                    <input type="text" class="form-control" v-model="user.name" required>
                </div>
                <div class="mb-3 form-group">
                    <label class="mb-2">No. WA</label>
                    <input type="text" class="form-control" v-model="user.phone" required>
                </div>
                <div class="mb-3 form-group">
                    <button class="btn btn-primary btn-block">Tambah Tamu</button>
                </div>
            </form>
        </div>
    </div>
</div>
</template>
<script>
    import { db } from '../firebaseDb';
    export default {
        data() {
            return {
                user: {
                }
            }
        },
        methods: {
            onFormSubmit(event) {
                event.preventDefault()
                db.collection('users').add(this.user).then(() => {
                    this.$toasted.show("Tamu Ditambahkan")
                    this.user.name = ''
                    this.user.phone = ''
                }).catch((error) => {
                    console.log(error);
                });
                this.$router.push('/list')
            }
        }
    }
</script>