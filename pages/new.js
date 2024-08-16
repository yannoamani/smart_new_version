{/* <script>
import "v-calendar/dist/style.css";
import Swal from "sweetalert2";
import { DatePicker } from "v-calendar";
import { VueperSlides, VueperSlide } from "vueperslides";
import instance, { lienImage } from "../api/api";
import { Help } from "../utils/helpers.js";

export default {
  name: "detailsResidence",
  components: {
    VueperSlides,
    VueperSlide,
    DatePicker,
  },
  data() {
    return {
      tableauLike: [],
      spinnerReserver: false,
      isloadingAvis: false,
      idResidence: "",
      detailResidence: null,
      valueAvis: null,
      moneyFormat: new Intl.NumberFormat("de-DE"),
      BookResidence: false,
      star: 0,
      isSpinner: false,
      lienImage: lienImage,
      path: "",
      range: {
        start: new Date(),
        end: new Date(),
      },
      slides: [
        {
          image: "../assets/house.png",
        },
        {
          image: "../assets/house.png",
        },
      ],
      responsiveOptions: [
        {
          breakpoint: "1500px",
          numVisible: 5,
        },
        {
          breakpoint: "1024px",
          numVisible: 3,
        },
        {
          breakpoint: "768px",
          numVisible: 2,
        },
        {
          breakpoint: "560px",
          numVisible: 1,
        },
      ],
      displayBasic: false,
      imagesPropriete: null,
      Indisponibilite: {},
      imgWhenNotImg: "../assets/house.png",
      numberValue: 1,
      IdImmobilier: "",
      Raison: "",
      nombreOfpersonnes: 1,
      avis: "",
      gallery: [],
      periodeIndisponibleResidence: [],
      isWhished: [],
      detailsBienImmobilerNotes: [],
      perPage: 3,

      totalPages: "",
      maxVisibleButtons: 3,
      isReservation: true,
      visibleModal: false,
      lienCinetpay: "",
      listOtheBien: [],
      listResidenceOther: [],
      isWishlist: this.$store.state.myListFavoris,
      currentEvaluation: 1,
      currentPageEvaluation: 1,
      rowsEvaluation: 5,
      currentResidence: 1,
      currentPageResidence: 1,
      rowsResidence: 5,
      transaction_id: "",
    };
  },
  computed: {
    calculeHeureReservation() {
      const date_debut = this.range.start.toISOString().slice(0, 10);
      const date_fin = this.range.end.toISOString().slice(0, 10);
      const total = Help.calculeDifferenceDate(date_fin, date_debut);
      return total;
    },
    paginatedEvaluation() {
      const startIndex = (this.currentPageEvaluation - 1) * this.rowsEvaluation;
      //console.log("startIndex", startIndex);
      const endIndex = startIndex + this.rowsEvaluation;
      //console.log("endIndex", endIndex);
      return this.detailResidence.notes.slice(startIndex, endIndex);
    },
    paginatedOtherResidence() {
      const startIndex = (this.currentPageResidence - 1) * this.rowsResidence;
      //console.log("startIndex", startIndex);
      const endIndex = startIndex + this.rowsResidence;
      //console.log("endIndex", endIndex);
      return this.listResidenceOther.slice(startIndex, endIndex);
    },
  },
  methods: {
    seeAllPhoto() {
      this.imagesPropriete = this.detailResidence.photos;
      this.displayBasic = true;
    },
    Appreciation() {
      if (!this.$store.state.token) {
        this.$router.push({
          path: "/connexion",
          query: { redirect: this.$route.path },
        });
      } else {
        this.isloadingAvis = true;
        if (!this.valueAvis) {
          Swal.fire({
            icon: "info",
            title: "Veuillez noter",
            showConfirmButton: true,
          });
          this.isloadingAvis = false;
        } else {
          let data = {
            commentaire: this.avis,
            rate: this.valueAvis,
            user_id: this.$store.state.user.id,
            propriety_id: this.$route.params.id,
          };
          instance
            .post("note", data)
            .then((response) => {
              //console.log("Appreciation", response);
              if (response.data.status == "true") {
                Swal.fire({
                  icon: "success",
                  title: "Nous vous remercions pour cette appréciation. Merci",
                  showConfirmButton: true,
                });
                this.valueAvis = "";
                this.avis = "";
                this.isloadingAvis = false;
              }
            })
            .catch((error) => {
              console.log(error);
              this.isloadingAvis = false;
            });
        }
      }
    },

    // RateResidence(id) {
    //   let data = {
    //     immobilier_id:id
    //   }

    //   if(this.isWhished.includes(id)){
    //     const DeleteIdLike = this.isWhished.findIndex(p=>p === id)
    //   this.isWhished.splice(DeleteIdLike,1)
    //   //console.log("DELETE",this.isWhished);
    //   }else{
    //     this.isWhished.push(id)
    //     //console.log("ADD",this.isWhished);
    //   }
    //   instance.post("whilist",data)
    //   .then(response=>{
    //     //console.log("heartResidence",response);
    //     if(response.data.status === 'false'){
    //       this.$router.push({
    //           path: "/connexion",
    //         })
    //     }
    //   })
    //   .catch(error=>{
    //     console.log(error);

    //   })
    // },
    FaireUneReservation() {
      this.BookResidence = !this.BookResidence;
    },
    resetData() {
      this.range = {
        start: new Date(),
        end: "",
      };
      this.nombreOfpersonnes = 1;
    },
    async listDetailsPropriete() {
      this.isSpinner = true;
      const paramsId = this.idResidence
        ? this.idResidence
        : this.$route.params.id;
      try {
        const responseDetailPropriete = await instance.get(
          "proprietes/" + paramsId
        );
        const responseResidence = await instance.get("proprietes");
        // console.log("responseResidence",responseResidence)
        this.detailResidence = responseDetailPropriete.data.data;
        this.listOtheBien = responseResidence.data.data.filter(
          (item) =>
            item.user.id === this.detailResidence.user.id &&
            item.id !== Number(this.$route.params.id)
        );
        this.listResidenceOther = this.listOtheBien.filter(
          (item) => item.category.label === "Résidence"
        );
        const { reservations } = responseDetailPropriete.data.data;
        // console.log("responseDetailPropriete.data.data", responseDetailPropriete.data.data);
        reservations.forEach((item) => {
          const joursEntre = Help.joursEntreDates(
            item.date_start,
            item.date_end
          );
          joursEntre.forEach((date) => {
            this.periodeIndisponibleResidence.push(date);
          });
        });
        this.isSpinner = false;
      } catch (error) {
        this.isSpinner = false;
        console.log(error);
      }
    },
    doPayment(idReservation) {
      let data = {
        source: "reservations",
        description: "reservation",
        reservation_id: idReservation,
        channels: "Mobile Money",
      };
      instance
        .post("start-payment", data)
        .then((response) => {
          console.log("start-paymentRESPONSE", response);
          if (response.data.status === true) {
            const amount =
              this.calculeHeureReservation * this.detailResidence.cost;
            //console.log("AMOUNT", amount);
            
            this.$store.commit("IS_PAY_CINETPAY", response.data.data.trans_id);
            this.paymentByCinetPay(amount, response.data.data.trans_id);
            // this.$store.state.isPayByCinetpay
            //console.log("data.transaction_id", response.data.data.trans_id);
            console.log(
              "this.$store.state.isPayByCinetpay",
              this.$store.state.isPayByCinetpay
            );
            //this.transaction_id = response.data.data.trans_id;
            //console.log("this.transaction_id", this.transaction_id);
            Swal.fire({
              icon: "success",
              title:
                "Merci de procéder au paiement avant que la réservation ne soit validée.",
              showConfirmButton: true,
            });
          }
          if (response.data.status === false) {
            Swal.fire({
              icon: "info",
              title: response.data.data,
              showConfirmButton: true,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    ReservationResidence() {
      if (!this.$store.state.token) {
        Swal.fire({
          icon: "error",
          title: "Veuillez-vous connecter",
          showConfirmButton: true,
        });
        this.$router.push({
          path: "/connexion",
          query: { redirect: this.$route.path },
        });
      } else {
        this.PosterReservation();
      }
    },
    PosterReservation() {
      this.spinnerReserver = true;

      let data = {
        propriety_id: this.$route.params.id,
        user_id: this.$store.state.user.id,
        date_start: this.range.start.toISOString().slice(0, 10),
        date_end: this.range.end.toISOString().slice(0, 10),
        number_people: Number(this.nombreOfpersonnes),
      };
      console.log(data);
      console.log("essaie")
      instance
        .post("reservations", data)
        .then((response) => {
          console.log("reservations", response);
          if (response.data.status === true) {
            this.doPayment(response.data.data.id);
            this.spinnerReserver = false;
          }
          if (response.data.status === false) {
            Swal.fire({
              icon: "info",
              title: response.data.message,
              showConfirmButton: true,
            });
            this.spinnerReserver = false;
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "info",
            title: error.response.data.message,
            showConfirmButton: true,
          });
          this.spinnerReserver = false;
        });
    },
    lancerVerifIfCustomPaid() {
      console.log(
        "this.$store.state.isPayByCinetpay",
        this.$store.state.isPayByCinetpay
      );
      if (
        this.$store.state.isPayByCinetpay === "" ||
        this.$store.state.isPayByCinetpay === null
      ) {
        //console.log("Pa encore generer");
      } else {
        //console.log("lancer");
        this.closeWindowCinetpay();
      }
    },
    closeWindowCinetpay() {
      let data = {
        cpm_trans_id: this.$store.state.isPayByCinetpay,
        cpm_site_id: "5866028",
        token: this.$store.state.tokenByCinetpay,
      };
      instance
        .post("payment/notify", data)
        .then((response) => {
          console.log("responseNotify", response);
          localStorage.setItem("responseNotify",response)
          this.visibleModal = false;
          if (response.status === "ok") {
            let htmlString = response.data.split("style>");
            //console.log("htmlString", typeof htmlString[2]);
            //console.log("htmlString2", htmlString[2].split('"')[27]);

            Swal.fire({
              icon:
                htmlString[2].split('"')[27] === "PENDING" ? "info" : "success",
              title:
                htmlString[2].split('"')[27] === "PENDING"
                  ? ${htmlString[2].split('"')[27]}...
                  : "Paiement effectué.",
              showConfirmButton: false,
              timer: 3500,
            });
            this.$store.commit("IS_PAY_CINETPAY", null);
            this.$store.commit("CODE_PAYEMENT", null);
            localStorage.removeItem("code");
            localStorage.removeItem("tokenCinetpay");
            // setTimeout(() => {
            //   window.location.reload();
            // }, 3500);

            console.log(
              "this.$store.state.isPayByCinetpay",
              this.$store.state.isPayByCinetpay
            );
          } else {
            //let htmlString = response.data.split("style>");
            //console.log("htmlString", typeof htmlString[2]);
            //console.log("htmlString2", htmlString[2].split('"')[27]);
            Swal.fire({
              icon: "info",
              title: response.data.message,
              showConfirmButton: false,
              timer: 3500,
            });
            // Swal.fire({
            //   icon: "info",
            //   title: "Paiement echoué",
            //   showConfirmButton: false,
            //   timer:3000
            // });
            this.visibleModal = false;
            this.$store.commit("IS_PAY_CINETPAY", null);
            this.$store.commit("CODE_PAYEMENT", null);
            localStorage.removeItem("code");
            localStorage.removeItem("tokenCinetpay");
            // setTimeout(() => {
            //   window.location.reload();
            // }, 3500);
            console.log(this.$store.state.isPayByCinetpay);
          }
        })
        .catch((error) => {
          localStorage.setItem("error",error)
          console.log(error);
          Swal.fire({
            icon: "info",
            //title: "Paiement echoué",
            showConfirmButton: false,
            timer: 3500,
          });
          this.visibleModal = false;
          this.$store.commit("IS_PAY_CINETPAY", null);
          this.$store.commit("CODE_PAYEMENT", null);
          localStorage.removeItem("code");
          localStorage.removeItem("tokenCinetpay");
          setTimeout(() => {
            window.location.reload();
          }, 3500);
        });
    },
    getLien(myLien) {
      this.lienCinetpay = myLien;
      this.visibleModal = true;
      //console.log("this.lienCinetpay", this.lienCinetpay);
    },
    async paymentByCinetPay(idAmount, trans_id) {
      const returnUrl =
        "https://dexter-immo.com" + this.$route.fullPath;
      const notifyUrl =
        "https://backend.dexter-immo.com/api/payment/notify";
      let data = JSON.stringify({
        apikey: "971408392655f1a56284615.67795424",
        site_id: "5866028",
        transaction_id: trans_id,
        amount: idAmount,
        mode: "PRODUCTION",
        currency: "XOF",
        close_after_response: true,
        alternative_currency: "XOF",
        description: "TEST INTEGRATION",
        customer_id: this.$store.state.user.id,
        customer_name: this.$store.state.user.lastname,
        customer_surname: this.$store.state.user.firstname,
        customer_email: this.$store.state.user.email,
        customer_phone_number: this.$store.state.user.phone,
        customer_address: "Abidjan",
        customer_city: "Abidjan",
        notify_url: notifyUrl,
        return_url: returnUrl,
        cancel_url: returnUrl,
        channels: "ALL",
        lock_phone_number: false,
        lang: "FR",
      });

      let config = {
        method: "post",
        url: "https://api-checkout.cinetpay.com/v2/payment",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      try {
        const response = await instance(config);
        //console.log("response.data.data", response.data);
        const lien = response.data.data.payment_url;
        this.$store.commit("CODE_PAYEMENT", response.data.data.payment_token);
        //  this.getLien(lien)
        window.open(lien, "_self");
      } catch (error) {
        console.log(error);
      }
    },
    async dislikePropriete(element) {
      try {
        const responseLike = await instance.put("favorites/" + element.id);
        //console.log("responseLike", responseLike);
        if (responseLike.data.status === true) {
          let index = this.$store.state.myListFavoris.findIndex(
            (item) => item.propriete.id === element.id
          );
          this.$store.state.myListFavoris.splice(index, 1);
          this.$store.commit("LIST_FAVORIS", this.$store.state.myListFavoris);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async likePropriete(idDislike) {
      const { id } = idDislike;
      this.tableauLike.push(id);
      let data = {
        properties: this.tableauLike,
      };
      try {
        const responseLike = await instance.post("favorites", data);
        //console.log("responseLike", responseLike);
        if (responseLike.data.status === true) {
          this.$store.state.myListFavoris.push(idDislike);
          this.$store.commit("LIST_FAVORIS", this.$store.state.myListFavoris);
        }
      } catch (error) {
        console.log(error);
      }
    },
    renderHeartRed(Propriete) {
      if (!this.$store.state.token) {
        Swal.fire({
          icon: "error",
          title: "Veuillez-vous connecter",
          showConfirmButton: true,
        });
        this.$router.push({
          path: "/connexion",
          query: { redirect: this.$route.path },
        });
      } else {
        if (
          this.$store.state.myListFavoris.some(
            (item) => item.propriete.id === Propriete.id
          )
        ) {
          this.dislikePropriete(Propriete);
        } else {
          this.likePropriete(Propriete);
        }
      }
    },
    seeOtherResidence(id) {
      this.idResidence = id;
      this.$router.push({ name: "details", params: { id: id } });
      this.listDetailsPropriete();
    },
    onPageChangeEvaluation(event) {
      //console.log("EVENT", event);
      this.currentPageEvaluation = event.page + 1;
    },
    onPageChangeResidence(event) {
      //console.log("EVENT", event);
      this.currentPageResidence = event.page + 1;
    },
  },
  mounted() {
    this.listDetailsPropriete();
    this.lancerVerifIfCustomPaid();
  },
};
</script>

<template>
  <div class="p-5 h-100" v-if="isSpinner">
    Chargement...
    <ProgressSpinner
      style="width: 25px; height: 25px"
      strokeWidth="8"
      fill="var(--surface-ground)"
      animationDuration=".5s"
      aria-label="Custom ProgressSpinner"
    />
  </div>

  <div v-else>
    <GalleriaVue
      v-model:visible="displayBasic"
      :value="imagesPropriete"
      :responsiveOptions="responsiveOptions"
      :numVisible="9"
      containerStyle="max-width: 50%"
      :circular="true"
      :fullScreen="true"
      :showItemNavigators="true"
      :showThumbnails="false"
    >
      <template #item="slotProps">
        <img
          :src="lienImage + slotProps.item.image"
          :alt="slotProps.item.alt"
          style="width: 100%; display: block"
        />
      </template>
      <template #thumbnail="slotProps">
        <img
          :src="lienImage + slotProps.item.image"
          :alt="slotProps.item.image"
          style="display: block"
        />
      </template>
    </GalleriaVue>

    <div class="position-relative">
      <button
        @click="seeAllPhoto"
        class="btn-lg text-dark rounded position-absolute show-photo"
      >
        Afficher toutes les photos
      </button>
      <div class="featured_slick_gallery gray text-start">
        <div class="featured_slick_gallery-slide" v-if="detailResidence">
          <vueper-slides :bullets="false" fixed-height="600px">
            <vueper-slide
              v-for="(slide, i) in detailResidence.photos"
              :key="i"
              :image="lienImage + slide.image"
            >
            </vueper-slide>
          </vueper-slides>
        </div>
        <div v-else>
          <vueper-slides :bullets="false" :touchable="false">
            <vueper-slide
              v-for="(slide, i) in slides"
              :key="i"
              :image="slide.image"
            />
          </vueper-slides>
        </div>
      </div>
      <div v-show="visibleModal" class="conteneur-cintepay">
        <iframe
          width="1000"
          height="800"
          frameborder="0"
          style="border: 0"
          title="visuel"
          :src="this.lienCinetpay"
          allowfullscreen
        >
        </iframe>

        <div class="position-absolute top-0 right-0">
          <button
            class="btn-lg bg-danger text-dark fw-bold"
            @click="closeWindowCinetpay"
          >
            Fermer
          </button>
        </div>
      </div>
      <section class="gray-simple" v-if="detailResidence">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 col-md-12 col-sm-12">
              <div class="property_block_wrap style-2 p-4">
                <div class="prt-detail-title-desc">
                  <span class="prt-types sale my-2">{{
                    detailResidence.status
                  }}</span>
                  <h3 class="my-3">{{ detailResidence.name }}</h3>
                  <h6 class="my-3 d-flex align-items-center">
                    <RatingStar
                      v-if="detailResidence.moyenne"
                      :modelValue="detailResidence.moyenne"
                      :readonly="true"
                      :stars="5"
                      :cancel="false"
                    />
                    <RatingStar
                      v-else
                      :readonly="true"
                      :stars="5"
                      :cancel="false"
                    />
                    <!-- <span class="reviews_text" v-if="detailResidence.moyenne">
                      {{ Math.floor(detailResidence.moyenne) }}</span
                    > -->
                  </h6>
                  <h6 class="my-3">
                    {{ detailResidence.person_maxi }} personnes autorisées
                  </h6>
                  <h6
                    class="my-3 badge bg-danger w-25 d-block"
                    v-if="detailResidence.room"
                  >
                    {{ detailResidence.room }} pièces
                  </h6>
                  <span v-if="detailResidence.municipality" class="my-3"
                    ><i class="lni-map-marker"></i>
                    {{ detailResidence.municipality.city.name }}
                    {{ detailResidence.municipality.name }}</span
                  >
                  <h3 class="prt-price-fix my-2">
                    {{ moneyFormat.format(detailResidence.cost) }} XOF
                    <sub v-if="detailResidence.types === 'Location'">
                      / jour</sub
                    >
                  </h3>
                </div>
              </div>

              <div class="property_block_wrap style-2">
                <div class="property_block_wrap_header">
                  <a
                    data-bs-toggle="collapse"
                    data-parent="#dsrp"
                    data-bs-target="#clTwo"
                    aria-controls="clTwo"
                    href="javascript:void(0);"
                    aria-expanded="true"
                    ><h4 class="property_block_title">Description</h4></a
                  >
                </div>
                <div id="clTwo" class="panel-collapse collapse show">
                  <div class="block-body">
                    <p>
                      {{ detailResidence.description }}
                    </p>
                  </div>
                </div>
              </div>

              <div
                class="property_block_wrap style-2"
                v-if="detailResidence.comodites"
              >
                <div class="property_block_wrap_header">
                  <a
                    data-bs-toggle="collapse"
                    data-parent="#amen"
                    data-bs-target="#clThree"
                    aria-controls="clThree"
                    href="javascript:void(0);"
                    aria-expanded="true"
                    ><h4 class="property_block_title">Equipements</h4></a
                  >
                </div>

                <div id="clThree" class="panel-collapse collapse show">
                  <div class="block-body">
                    <ul class="avl-features third">
                      <li
                        v-for="(commodite, index) in detailResidence.comodites"
                        :key="index"
                      >
                        {{ commodite.pivot.number }} {{ commodite.label }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="property_block_wrap style-2">
                <div class="property_block_wrap_header">
                  <a
                    data-bs-toggle="collapse"
                    data-parent="#loca"
                    data-bs-target="#clSix"
                    aria-controls="clSix"
                    href="javascript:void(0);"
                    aria-expanded="true"
                    class="collapsed"
                    ><h4 class="property_block_title">Lieu</h4></a
                  >
                </div>
                <div id="clSix" class="panel-collapse collapse show">
                  <div class="block-body">
                    <div class="map-container">
                      <h6 v-if="detailResidence.municipality">
                        <strong> ville :</strong>
                        {{ detailResidence.municipality.city.name }}
                      </h6>
                      <h6 v-if="detailResidence.adress">
                        <strong> Plus précisement :</strong>
                        {{ detailResidence.adress }}
                      </h6>
                      <h6 v-if="detailResidence.localisation_gps">
                        <strong>Localisation :</strong>
                        <a
                          class="d-block multiline texte-coupe-localisation"
                          :href="detailResidence.localisation_gps"
                          _blank
                        >
                          {{ detailResidence.localisation_gps }}
                        </a>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>

              <div class="property_block_wrap style-2">
                <div
                  class="property_block_wrap_header"
                  v-if="detailResidence && detailResidence.notes.length"
                >
                  <!-- <a-rate :value="detailResidence.moyenne" disabled /> -->
                  <div class="d-flex align-items-center justify-content-center">
                    <h1>{{ Math.floor(detailResidence.moyenne) }}</h1>
                    <h6 class="fw-bold">/5</h6>
                    <h5 class="mx-2">
                      ({{ detailResidence.notes.length }} Avis)
                    </h5>
                  </div>
                  <a
                    data-bs-toggle="collapse"
                    data-parent="#rev"
                    data-bs-target="#clEight"
                    aria-controls="clEight"
                    href="javascript:void(0);"
                    aria-expanded="true"
                    ><h4 class="property_block_title py-4"></h4
                  ></a>
                </div>
                <div class="fw-bold px-3" v-else>
                  <a-rate :value="0" disabled />
                  <a
                    data-bs-toggle="collapse"
                    data-parent="#rev"
                    data-bs-target="#clEight"
                    aria-controls="clEight"
                    href="javascript:void(0);"
                    aria-expanded="true"
                    ><h4 class="property_block_title">Avis</h4></a
                  >
                  Soyez le premier à évaluer cette résidence.
                </div>

                <div
                  id="clEight"
                  class="panel-collapse collapse show"
                  v-if="detailResidence.notes.length"
                >
                  <div class="block-body">
                    <div class="author-review">
                      <div class="comment-list">
                        <ul>
                          <li class="article_comments_wrap">
                            <article>
                              <div class="article_comments_thumb"></div>
                              <div
                                class="comment-details my-3"
                                :key="item.id"
                                v-for="item in paginatedEvaluation"
                              >
                                <div class="comment-meta">
                                  <div class="comment-left-meta">
                                    <div
                                      class="author-name d-flex align-items-center"
                                    >
                                      <div class="profil-photo">
                                        <i class="bi bi-person-fill"></i>
                                      </div>
                                      <span class="mx-2"
                                        >{{ item.user.lastname }}
                                        {{ item.user.firstname }}</span
                                      >
                                    </div>
                                    <div
                                      class="comment-date d-flex align-items-center"
                                    >
                                      <a-rate :value="item.rate" disabled />

                                      <span class="mx-2">{{
                                        new Date(
                                          item.created_at
                                        ).toLocaleDateString("fr", {
                                          weekday: "long",
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                        })
                                      }}</span>
                                    </div>
                                  </div>
                                </div>
                                <div class="comment-text">
                                  <p>{{ item.commentaire }}</p>
                                  <p v-if="!item.commentaire" class="fw-bold">Pas de commentaire</p>
                                </div>
                              </div>
                              <div v-if="detailResidence.notes.length">
                                <PaginatorVue
                                  v-model="currentPageEvaluation"
                                  :rows="rowsEvaluation"
                                  :totalRecords="detailResidence.notes.length"
                                  @page="onPageChangeEvaluation"
                                ></PaginatorVue>
                              </div>
                            </article>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="property_block_wrap style-2">
                <div class="property_block_wrap_header">
                  <a
                    data-bs-toggle="collapse"
                    data-parent="#clSev"
                    data-bs-target="#clSev"
                    aria-controls="clOne"
                    href="javascript:void(0);"
                    aria-expanded="true"
                    class="collapsed my-3"
                    ><h3 class="property_block_title">
                      Autre résidence du fournisseur
                    </h3></a
                  >
                  <div class="row">
                    <div
                      class="col-lg-12 col-md-12 col-sm-12 text-left my-3"
                      v-for="item in paginatedOtherResidence"
                      :key="item.id"
                    >
                      <div class="dashboard-stat widget-1 m-0">
                        <span
                          @click.prevent="renderHeartRed(item)"
                          class="position-absolute"
                          style="
                            background: white;
                            padding: 0 0.5em;
                            top: 0.5em;
                            right: 0.5em;
                            border-radius: 5px;
                            box-shadow: 1px 1px 1px 1px black;
                            z-index: 50;
                            cursor: pointer;
                          "
                        >
                          <i
                            class="bi bi-heart-fill"
                            style="font-size: 1.5em"
                            :class="
                              this.$store.state.myListFavoris.some(
                                (el) => el.id === item.id
                              )
                                ? 'color-heart'
                                : null
                            "
                          ></i>
                        </span>
                        <div class="dashboard-stat-content">
                          <img
                            class="image-favoris"
                            :src="
                              https://backend.dexter-immo.com/public/public/image/ +
                              item.photos[0].image
                            "
                            :alt="item.photos[0].image"
                          />
                        </div>
                      </div>
                      <div
                        class="d-flex justify-content-between align-items-center"
                      >
                        <div class="m-0 p-0">
                          <h5 class="m-0 p-0">{{ item.name }}</h5>
                          <span class="m-0 p-0 fw-bold"
                            ><i class="bi bi-geo-alt"></i
                            >{{ item.adress }}</span
                          >
                          <p class="m-0 p-0 fw-bold">
                            {{ moneyFormat.format(item.cost) }} XOF
                            {{
                              item.types.label === "Location" ? "/jour" : null
                            }}
                          </p>
                        </div>
                        <button class="btn bg-dark text-light">
                          <a
                            href="#"
                            @click.prevent="seeOtherResidence(item.id)"
                            class="more-btn"
                            >Voir plus</a
                          >
                        </button>
                      </div>
                    </div>
                    <div v-if="listResidenceOther.length">
                      <PaginatorVue
                        v-model="currentPageResidence"
                        :rows="rowsResidence"
                        :totalRecords="listResidenceOther.length"
                        @page="onPageChangeResidence"
                      ></PaginatorVue>
                    </div>
                    <div v-if="!listResidenceOther.length" class="fw-bold">
                      <h6 class="text-center">Pas d'autre résidence.</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-12 col-sm-12">
              <div class="like_share_wrap b-0">
                <div class="reservation">
                  <div class="d-flex align-items-center">
                    <div class="ecriteau"></div>
                    <span>Indisponible</span>
                  </div>
                  <DatePicker
                    is-expanded
                    v-model="range"
                    is-range
                    :disabled-dates="periodeIndisponibleResidence"
                    :min-date="new Date()"
                    class="datepickrs"
                  >
                  </DatePicker>

                  <form @submit.prevent="ReservationResidence">
                    <div>
                      <div class="my-3">
                        <label class="text-start d-block my-1"
                          >Le nombre d'occupant</label
                        >
                        <MazInputNumber
                          v-model="nombreOfpersonnes"
                          label="Entrer un nombre"
                          :min="1"
                          :max="detailResidence.person_maxi"
                          :step="1"
                          size="md"
                          color="secondary"
                          class="w-100"
                        />
                      </div>
                    </div>
                    <div class="text-start mt-3">
                      <h5>
                        <strong>{{ detailResidence.libelle }}</strong>
                      </h5>
                      <h6>
                        {{ moneyFormat.format(detailResidence.cost) }} XOF
                        <span>/Jour</span>
                      </h6>
                      <h6 v-if="range.start && range.end">
                        <span class="d-block my-2"
                          >Arrivée :
                          {{
                            new Date(
                              this.range.start.toISOString().slice(0, 10)
                            ).toLocaleDateString("fr")
                          }}</span
                        >
                        <span>
                          Départ :
                          {{
                            new Date(
                              this.range.end.toISOString().slice(0, 10)
                            ).toLocaleDateString("fr")
                          }}</span
                        >
                      </h6>
                      <h6 v-if="calculeHeureReservation > 0">
                        Total :
                        {{
                          moneyFormat.format(
                            calculeHeureReservation * detailResidence.cost
                          )
                        }}
                        XOF
                      </h6>
                    </div>
                    <div
                      class="text-center mt-4"
                     
                    >
                      <button
                        v-if="
                          calculeHeureReservation > 0 &&
                          new Date(
                            this.range.end.toISOString().slice(0, 10)
                          ).toLocaleDateString('fr') !==
                            new Date(
                              this.range.start.toISOString().slice(0, 10)
                            ).toLocaleDateString('fr')
                        "
                        class="btn btn-reservation bg-dark text-light"
                        type="submit"
                      >
                        <span v-if="spinnerReserver">
                          <ProgressSpinner
                            style="width: 25px; height: 25px"
                            strokeWidth="8"
                            fill="var(--surface-ground)"
                            animationDuration=".5s"
                            aria-label="Custom ProgressSpinner"
                          />
                        </span>
                        <span v-else> Réserver </span>
                      </button>
                      <span v-else class="text-danger"
                        >Pour réserver veuillez sélectionner la période de la
                        réservation</span
                      >
                    </div>
                    <!-- <span v-else class="text-danger"
                        >Vous devez avoir un compte client pour effectuer la réservation.</span
                      > -->
                  </form>
                </div>
              </div>

              <div class="details-sidebar">
                <div class="sides-widget">
                  <div class="sides-widget-header colorier_header">
                    <div class="sides-widget-details">
                      <h4 class="text-light">Dexter</h4>
                      <span class="text-light"
                        ><i class="lni-phone-handset"></i>+225 05 46 66 77 66 /
                        +225 07 07 96 96 72.</span
                      >
                    </div>
                    <div class="clearfix"></div>
                  </div>
                </div>
              </div>

              <div class="details-sidebar mt-3">
                <div class="sides-widget">
                  <div class="sides-widget-header avis">
                    <div class="details">
                      <h4 class="text-dark">Donner votre avis</h4>
                      <div
                        v-if="
                        this.$store.state.user.propriety_ids &&
                          this.$store.state.user.propriety_ids.some(
                            (item) =>
                              Number(item) === Number(this.$route.params.id)
                          )
                        "
                      >
                        <div>
                          <a-rate v-model:value="valueAvis" />
                        </div>
                        <div class="text-left" v-if="3 >= valueAvis">
                          <label for="" class="text-start">Commentaire</label>
                          <textarea
                            required
                            class="w-100 form-group text-dark"
                            cols="30"
                            rows="10"
                            v-model="avis"
                          ></textarea>
                        </div>

                        <div>
                          <button
                            :disabled="valueAvis === null || valueAvis === ''"
                            class="btn-lg bg-dark text-light w-100"
                            @click.prevent="Appreciation"
                          >
                            <span v-if="isloadingAvis">
                              Chargement...
                              <ProgressSpinner
                                style="width: 25px; height: 25px"
                                strokeWidth="8"
                                fill="var(--surface-ground)"
                                animationDuration=".5s"
                                aria-label="Custom ProgressSpinner"
                              />
                            </span>
                            <span v-else> Envoyer </span>
                          </button>
                        </div>
                      </div>
                      <div class="text-center fw-bold text-danger" v-else>
                        Veuillez faire une réservation avant d'évaluer la
                        résidence
                      </div>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        class="modal fade"
        id="popup-video"
        tabindex="-1"
        role="dialog"
        aria-labelledby="popupvideo"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content" id="popupvideo">
            <iframe
              class="embed-responsive-item full-width"
              height="480"
              src="https://www.youtube.com/embed/qN3OueBm9F4?rel=0"
              title="visuel"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.color-heart {
  color: crimson !important;
}
.dashboard-stat.widget-1 {
  height: 250px !important;
}
.dashboard-stat-content {
  padding: 0 !important;
}
.bi-person-fill {
  font-size: 1.5em !important;
}
.profil-photo {
  width: 35px;
  height: 35px;
  border: 5px solid black;
  border-radius: 100%;
  text-align: "center";
}
.ecriteau {
  width: 15px;
  height: 15px;
  background: rgb(209, 0, 0);
  border-radius: 100%;
  margin: 0 1em;
}
.badge {
  width: 90px !important;
}
.colorier_header {
  background-color: rgb(0, 0, 0);
}
.text-light {
  color: white !important;
}
.details {
  padding-left: 0 !important;
}

.avis {
  background-color: white !important;
  display: block !important;
}
.text-dark {
  color: black !important;
  font-weight: bold !important;
}
.bg-danger {
  background-color: #c29b00 !important;
  font-weight: bold !important;
}
.btn-likes:active,
.btn-likes:hover,
.btn-likes:focus {
  background-color: rgb(255, 0, 51) !important;
  font-weight: bold !important;
}
.pi-heart-fill {
  position: absolute;
  top: -0.3em;
  left: 0em;
  z-index: 99;
  cursor: pointer;
}
textarea {
  border-radius: 10px;
  padding: 0 1em;
}
.chargement {
  margin-top: 15em;
}
.skeleton {
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  left: 0;
  background-color: transparent;
  z-index: 999;
  display: flex;
  justify-content: center;
  place-items: flex-start;
}
.btn-reservation {
  width: 100% !important;
}
.datepickrs {
  margin-top: 1.5em !important;
}

.page {
  width: 30px;
  height: 30px;
}
.prev {
  background: crimson;
  color: white !important;
}
.pagination_btn {
  border: 1px solid crimson !important;
  color: rgb(1, 1, 1) !important;
}
.color {
  background: crimson;
}
.next-prev {
  border: none;
  color: rgb(1, 1, 1) !important;
}
.conteneur-cintepay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  bottom: 0;
  right: 0;
  background: black;
  display: flex;
  place-items: center;
  justify-content: center;
  z-index: 9999;
}
</style> */}