<template>
<div class="container-fluid">
    <div class="row justify-content-center m-3">
        <div class="alert alert-primary" role="alert">
            Tambah data tamu anda untuk melakukan share pada list tamu.
            <router-link class="alert-link" to="/list">Lihat Semua Tamu <font-awesome-icon icon="fa-solid fa-arrow-right" /></router-link>
        </div>
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
                    <input type="number" class="form-control" v-model="user.phone" required>
                </div>
                <div class="mb-3 form-group">
                    <label class="mb-2">Username IG</label>
                    <input type="text" class="form-control" v-model="user.ig" required>
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
    import { db } from '../firebaseDb.js';
    export default {
        data() {
            return {
                user: {
                }
            }
        },
        methods: {
            handlePaste(event) {
                event.preventDefault();
                const clipboardData = event.clipboardData || window.clipboardData;
                const pastedText = clipboardData.getData('text/plain');
                const numbersOnly = pastedText.replace(/\D/g, '');
                document.getElementById('phone-input').value = numbersOnly;
            },
            onFormSubmit(event) {
                event.preventDefault()
                db.collection('users').add(this.user).then(() => {
                    this.$toasted.show("Tamu Ditambahkan")
                    this.user.name = ''
                    this.user.phone = ''
                    this.user.ig = ''
                }).catch((error) => {
                    console.log(error);
                });
                this.$router.push('/list')
            }
        }
    }
</script>