<template>
  <div class="navigator">

    <div v-if="boolImage" class="nav-conv">
      <div class="back" @click="handleClick">
        <i  class="fas fa-chevron-left "></i>
      </div>
      <div class="profile">
    <img v-if="boolImage" :src="getImage(image==null ? 'default':image)" alt="img">
    <span>{{title}}</span>
      </div>
    <i class=" more fas fa-ellipsis-h"></i>
  </div>
  <div v-else class="nav-info">
    <div class="btn-return" @click="handleClick">
      <i  class="fas fa-chevron-left retour"></i>
    </div>
    <span>{{title}}</span>
  </div>

    <hr>
  </div>
</template>
<script >



import {getImage} from "@/services/image.service";
import {defineComponent} from "vue";

export default defineComponent({
  name: 'vNavigator',
  props: {
    boolImage: {
      type: Boolean,
      default: false
    },
    image: {
      type: String,
      default: 'default.png'
    },
    title: {
      type: String,
      default: ''
    }

  },
  methods: {
    getImage,
    handleClick() {
      this.$emit('return');
    }
  }
})

</script>

<style scoped>



.nav-conv {
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
}

.nav-conv .back {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 10px;

  cursor: pointer;

}



.nav-conv .back i {
  color: var(--inactif-color);
  font-size: 20px;
  background-color: var(--secondary-color);
  border-radius: 50%;
  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-conv .back i:hover {
  color: var(--actif-color);
  background-color: var(--selection-color);
}


.profile {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 18px;
  color: var(--text-color);
}



.more {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 10px;
  color: var(--inactif-color);
  cursor: pointer;
}








.navigator hr {
  width: 100vw;
  border: 1px solid ;
  border-color: var(--selection-color);
  margin: 0;
}


.navigator {
  height: 50px;
  position: relative;

}

.nav-info {
  display: flex;
  justify-content: center;
  font-size: 18px;
  align-items: center;
  background-color: var(--secondary-color);
  color: var(--text-color);
  height: 100%;

}



.nav-conv img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.retour {
  position: absolute;
  left: 11px;
  top: 6px;
  font-size: 20px;
  color: var(--text-color);
  cursor: pointer;
}

.btn-return {
  position: absolute;
  left: 12px;
  top: 7px;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  color: var(--inactif-color);
  cursor: pointer;
  border-radius: 50%;

}

.btn-return i {
  font-size: 20px;
}

.btn-return:hover {
  background-color: var(--selection-color);
  color: var(--actif-color);

}


@media (min-width: 1500px) {
  .retour{
    display: none;
  }
  .btn-return{
    display: none;
  }


}

</style>