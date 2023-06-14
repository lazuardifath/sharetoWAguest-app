<template>
<div class="container-fluid">
    <div class="row justify-content-center mt-3 ml-2">
        <div class="alert alert-primary alert-dismissible fade show" style="font-size: 12px;" role="alert">
            <ul>
            <li>Gunakan tombol <button class="btn btn-success" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .45rem; --bs-btn-font-size: .5rem;"><font-awesome-icon icon="fa-solid fa-phone-alt" /></button> Untuk share ke tamu tujuan yang sudah ditambahkan.</li>
            <li>Gunakan tombol <button class="btn btn-dark" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .45rem; --bs-btn-font-size: .5rem;"><font-awesome-icon icon="fa-brands fa-instagram" /></button> Untuk share ke instagram sesuai username yang sudah di-input kemudian<b> Paste</b>.</li>
            </ul>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </div>
    <div class="row justify-content-center mt-3 ml-2">
        <router-link to="/" class="btn btn-primary" style="margin: 2px 0px;"><font-awesome-icon icon="fa-solid fa-pencil-alt" /> Tambah Tamu</router-link>
    </div>
    <div class="row justify-content-center">
        <div class="col-lg-6">
            <div class="table-responsive">
                <input class="form-control form-control-sm my-3 p-1" v-model="search" type="text" placeholder="Cari Nama" aria-label=".form-control-sm example">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th style="width: 35%;">Nama</th>
                                <th style="width: 35%;">No. Wa</th>
                                <th style="width: 30%;">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="filteredUsers.length === 0">
                                <td colspan="3" class="text-center">Tidak ada Tamu. <router-link to="/"><b><u>Tambah Tamu <font-awesome-icon icon="fa-solid fa-arrow-right" /></u></b></router-link></td>
                            </tr>
                            <tr v-for="user in filteredUsers" :key="user.key">
                                <td style="font-size: 12px;vertical-align: middle;">{{ user.name }} <span style="font-size: 8px;vertical-align: middle;"><b>{{ user.ig }}</b></span></td>
                                <td style="font-size: 8px;vertical-align: middle;">{{ user.phone }}</td>
                                <td>
                                    <div class="btn-group btn-group-sm" style="scale:70%" role="group" aria-label="Small button group">
                                        <router-link :to="{name: 'edit', params: { id: user.key }}" class="btn btn-primary" style="margin: 2px 0px;"><font-awesome-icon icon="fa-solid fa-pencil-alt" /></router-link>
                                        <button @click.prevent="deleteUser(user.key)" class="btn btn-danger" style="margin:2px 0px"><font-awesome-icon icon="fa-solid fa-trash-alt" /></button>
                                        <button @click.prevent="sendLink(user.key)" class="btn btn-success" style="margin:2px 0px"><font-awesome-icon icon="fa-solid fa-phone-alt" /></button>
                                        <button @click.prevent="sendIg(user.key)" class="btn btn-dark" style="margin:2px 0px"><font-awesome-icon icon="fa-brands fa-instagram" /></button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
            </div>
        </div>
    </div>
</div>
</template>
<script>
    import { db } from '../firebaseDb';
    
    export default {
        data() {
            return {
                Users: [],
                search: '',
            }
        },
        mounted() {
            let recaptchaScript = document.createElement('script')
            recaptchaScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.8/clipboard.min.js')
            document.head.appendChild(recaptchaScript)
        },
        created() {
            db.collection('users').onSnapshot((snapshotChange) => {
                this.Users = [];
                snapshotChange.forEach((doc) => {
                    this.Users.push({
                        key: doc.id,
                        name: doc.data().name,
                        phone: doc.data().phone,
                        ig: doc.data().ig,
                    })
                });
            })
        },
        computed: {
                filteredUsers() {
                return this.Users.filter((user) => {
                    return user.name.toLowerCase().includes(this.search.toLowerCase());
                });
            }
        },
        methods: {
            deleteUser(id){
                this.$confirm("Are you sure?").then(()  => {
                    db.collection("users").doc(id).delete().then(() => {
                        console.log("Document deleted!");
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                })
                .catch((error) => {
                        console.error(error);
                });
            },
            sendLink(id){
                db.collection('users')
                .doc(id) // Replace 'websiteId' with the specific document ID
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        // Replace 'url' with the field containing the website URL in your Firestore document
                        this.name = doc.data().name;
                        this.url = 'https%3A%2F%2Flazuardiemara.vercel.app%2F%3Fto%3D'+ this.name;
                        this.encodedURL = this.url.replace(/ /g, '%2B');
                        this.phone = doc.data().phone.replace('08', '628');
                        window.location.href = 'https://api.whatsapp.com/send?phone='+ this.phone +'&text=*%D8%A7%D9%84%D8%B3%D9%91%D9%8E%D9%84%D8%A7%D9%8E%D9%85%D9%8F%20%D8%B9%D9%8E%D9%84%D9%8E%D9%8A%D9%92%D9%83%D9%8F%D9%85%D9%92%20%D9%88%D9%8E%D8%B1%D9%8E%D8%AD%D9%92%D9%85%D9%8E%D8%A9%D9%8F%20%D8%A7%D9%84%D9%84%D9%87%D9%90%20%D9%88%D9%8E%D8%A8%D9%8E%D8%B1%D9%8E%D9%83%D9%8E%D8%A7%D8%AA%D9%8F%D9%87%D9%8F*%0A%0AMaha%20suci%20Allah%20yang%20telah%20menciptakan%20makhluk-Nya%20berpasang-pasangan.%0A%0ASaudara%2Fi%2C%20*'+ this.name +'*%0A%0ADengan%20mengharap%20rahmat%20dan%20ridha-Nya%2C%20perkenankan%20kami%20menyampaikan%20kabar%20gembira%20atas%20pernikahan%20kami%3A%20%0A%0A*Lazuardi%20Fatahilah%20Hamdi*%0A%26%0A*Emara%20Najla%20Medina*%0A%0AAkad%20nikah%20%26%20resepsi%20Insya%20Allah%20akan%20dilaksanakan%20pada%20%3A%0A%0A*Akad*%3A%0AHari%2FTanggal%20%3A%20Sabtu%2C%2001%20Juli%202023%0APukul%20%3A%2008.00%20s%2Fd%20Selesai%0ATempat%20%3A%20Jl.%20DR.%20Soetomo%20No.2%2C%20Prenam%2C%20Dukuhwringin%2C%20Kec.%20Slawi%2C%20Kabupaten%20Tegal%2C%20Jawa%20Tengah%0A%0A*Resepsi*%3A%0AHari%2FTanggal%20%3A%20Sabtu%2C%2001%20Juli%202023%0APukul%20%3A%2011.00%20s%2Fd%20Selesai%0ATempat%20%3A%20Jl.%20DR.%20Soetomo%20No.2%2C%20Prenam%2C%20Dukuhwringin%2C%20Kec.%20Slawi%2C%20Kabupaten%20Tegal%2C%20Jawa%20Tengah%0A%0ADengan%20ini%2C%20perkenankan%20kami%20mengundang%20saudara%2Fi%20*' + this.name +'*%20pada%20%3A%20%0A'+ this.encodedURL +'%0A%0ASuatu%20kebahagiaan%20%26%20kehormatan%20bagi%20kami%20sekiranya%20saudara%2Fi%20berkenan%20memberikan%20doa%20untuk%20kebaikan%20dan%20keberkahan%20pernikahan%20kami.%0A%0AAtas%20perhatian%20dan%20doa%20restu%20dari%20saudara%2Fi%20sekalian%2C%20kami%20ucapkan%20terimakasih.%0A%0A*%D9%88%D9%8E%20%D8%A7%D9%84%D8%B3%D9%8E%D9%91%D9%84%D8%A7%D9%8E%D9%85%D9%8F%20%D8%B9%D9%8E%D9%84%D9%8E%D9%8A%D9%92%D9%83%D9%8F%D9%85%D9%92%20%D9%88%D9%8E%D8%B1%D9%8E%D8%AD%D9%92%D9%85%D9%8E%D8%A9%D9%8F%20%D8%A7%D9%84%D9%84%D9%87%D9%90%20%D9%88%D9%8E%D8%A8%D9%8E%D8%B1%D9%8E%D9%83%D9%8E%D8%A7%D8%AA%D9%8F%D9%87%D9%8F*%0A%0AKami%20yang%20berbahagia%0A*Lazuardi%20%26%20Emara*';
                    }
                    })
                    .catch((error) => {
                        console.error('Error retrieving website URL:', error);
                    });
            },
            sendIg(id) {
                db.collection('users')
                .doc(id) // Replace 'websiteId' with the specific document ID
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        // Replace 'url' with the field containing the website URL in your Firestore document
                        this.name = doc.data().name;
                        this.ig = doc.data().ig;
                        this.url = 'https%3A%2F%2Flazuardiemara.vercel.app%2F%3Fto%3D'+ this.name;
                        this.encodedURL = this.url.replace(/ /g, '%2B');
                        this.phone = doc.data().phone.replace('08', '628');
                        this.uri = '*%D8%A7%D9%84%D8%B3%D9%91%D9%8E%D9%84%D8%A7%D9%8E%D9%85%D9%8F%20%D8%B9%D9%8E%D9%84%D9%8E%D9%8A%D9%92%D9%83%D9%8F%D9%85%D9%92%20%D9%88%D9%8E%D8%B1%D9%8E%D8%AD%D9%92%D9%85%D9%8E%D8%A9%D9%8F%20%D8%A7%D9%84%D9%84%D9%87%D9%90%20%D9%88%D9%8E%D8%A8%D9%8E%D8%B1%D9%8E%D9%83%D9%8E%D8%A7%D8%AA%D9%8F%D9%87%D9%8F*%0A%0AMaha%20suci%20Allah%20yang%20telah%20menciptakan%20makhluk-Nya%20berpasang-pasangan.%0A%0ASaudara%2Fi%2C%20*'+ this.name +'*%0A%0ADengan%20mengharap%20rahmat%20dan%20ridha-Nya%2C%20perkenankan%20kami%20menyampaikan%20kabar%20gembira%20atas%20pernikahan%20kami%3A%20%0A%0A*Lazuardi%20Fatahilah%20Hamdi*%0A%26%0A*Emara%20Najla%20Medina*%0A%0AResepsi%20Insya%20Allah%20akan%20dilaksanakan%20pada%20%3A%0A%0A*Resepsi*%3A%0AHari%2FTanggal%20%3A%20Sabtu%2C%2001%20Juli%202023%0APukul%20%3A%2011.00%20s%2Fd%20Selesai%0ATempat%20%3A%20Jl.%20DR.%20Soetomo%20No.2%2C%20Prenam%2C%20Dukuhwringin%2C%20Kec.%20Slawi%2C%20Kabupaten%20Tegal%2C%20Jawa%20Tengah%0A%0ADengan%20ini%2C%20perkenankan%20kami%20mengundang%20saudara%2Fi%20*' + this.name +'*%20pada%20%3A%20%0A'+ this.encodedURL +'%0A%0ASuatu%20kebahagiaan%20%26%20kehormatan%20bagi%20kami%20sekiranya%20saudara%2Fi%20berkenan%20memberikan%20doa%20untuk%20kebaikan%20dan%20keberkahan%20pernikahan%20kami.%0A%0AAtas%20perhatian%20dan%20doa%20restu%20dari%20saudara%2Fi%20sekalian%2C%20kami%20ucapkan%20terimakasih.%0A%0A*%D9%88%D9%8E%20%D8%A7%D9%84%D8%B3%D9%8E%D9%91%D9%84%D8%A7%D9%8E%D9%85%D9%8F%20%D8%B9%D9%8E%D9%84%D9%8E%D9%8A%D9%92%D9%83%D9%8F%D9%85%D9%92%20%D9%88%D9%8E%D8%B1%D9%8E%D8%AD%D9%92%D9%85%D9%8E%D8%A9%D9%8F%20%D8%A7%D9%84%D9%84%D9%87%D9%90%20%D9%88%D9%8E%D8%A8%D9%8E%D8%B1%D9%8E%D9%83%D9%8E%D8%A7%D8%AA%D9%8F%D9%87%D9%8F*%0A%0AKami%20yang%20berbahagia%0A*Lazuardi%20%26%20Emara*';
                        this.newuri = decodeURIComponent(this.uri);
                        const textarea = document.createElement('textarea');
                        textarea.value = this.newuri;
                        document.body.appendChild(textarea);

                        textarea.select();
                        textarea.setSelectionRange(0, textarea.value.length);

                        document.execCommand('copy');
                        document.body.removeChild(textarea);

                        console.log('Text copied to clipboard');
                        this.$toasted.show('Text copied to clipboard');
                        
                        window.open('https://www.instagram.com/'+ this.ig, '_blank')
                        
                        }
                    })
                    .catch((error) => {
                        console.error('Error retrieving website URL:', error);
                    });
            }
        }
    }
</script>
<style>
    .btn-primary {
        margin-right: 12px;
    }
</style>