<template>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <h3 class="text-center">Update Tamu</h3>
            <form @submit.prevent="onUpdateForm">
                <div class="form-group" style="margin: 8px;">
                    <label>Nama</label>
                    <input style="margin-top: 5px;" type="text" class="form-control" v-model="user.name" required>
                </div>
                <div class="form-group" style="margin: 8px;">
                    <label>No. WA</label>
                    <input style="margin-top: 5px;" type="text" class="form-control" v-model="user.phone" required>
                </div>
                <div class="form-group" style="margin: 8px;">
                    <label>No. WA</label>
                    <input style="margin-top: 5px;" type="text" class="form-control" v-model="user.ig" required>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary btn-block" style="margin: 8px;">Add User</button>
                </div>
            </form>
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
        created() {
            let dbRef = db.collection('users').doc(this.$route.params.id);
            dbRef.get().then((doc) => {
                this.user = doc.data();
            }).catch((error) => {
                console.log(error)
            })
        },
        methods: {
            onUpdateForm(event) {
                event.preventDefault()
                db.collection('users').doc(this.$route.params.id)
                .update(this.user).then(() => {
                    this.$toasted.show("Tamu Berhasil di Edit, Silahkan Kirim Ulang WhatsApp")
                    console.log("User successfully updated!");
                    this.$router.push('/list')
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }
</script>