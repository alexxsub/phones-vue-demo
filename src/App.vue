<template>
  <div>
  
    <!-- Описываем поле ввода и вешаем обработчик на нажатие клавиши Enter -->
    <input placeholder="Введите номер" ref="number" v-model="newPhone.number" />
    <br>
    <input placeholder="Введите имя" v-model="newPhone.name" @keyup.enter="addPhone" />
    <br>
    <button v-show="editmode" @click="savePhone">Сохранить</button> 
    <br>
    <button v-show="editmode" @click="resetPhone">Отмена</button>
     <table border="1">
      <thead>
        <tr>
          <th v-for="key in Columns" :key="key">{{key}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="phone in Phones" :key="phone.number">
          <td>
            <a href="#" @click="setPhone(phone)">{{phone.number}}</a>
          </td>
          <td>{{phone.name}}</td>
          <td>
            <input type="button" @click="deletePhone(phone)" value="X">
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { gql } from "apollo-boost";
//для компактности выделяем фрагмент gql
const fragment = gql`
  fragment Phone on Phone {
    number
    name
  }
`;
const ALL_PHONES_QUERY = gql`
  query Phones {
    Phones {
      ...Phone
    }
  }
  ${fragment}
`;
export default {
  data() {
    return {
      editmode: false, //флаг режима, режим true - правка данных, false -ввод новых
      Columns: ["Номер", "Имя", ""],
      newPhone: {
        //элмент данных, запись в массиве
        number: "",
        name: ""
      },
      index: -1 //индекс редактируемого элемента
    
    };
  },
    apollo: {
      Phones: {
        query: ALL_PHONES_QUERY
       }
  },

  //раздел методов, описываем объектом methods , https://ru.vuejs.org/v2/api/#methods
  methods: {
    //фцнкция добавления в массив нового элемента
    addPhone() {
      //видимость переменных получаем через this
      this.phones.push(this.newPhone); //нам не надо заботится о выводе новых данных
      //как только элемент будет добавлен в массив, он появится в списке
      this.newPhone = { number: "", name: "" }; // затираем переменную ввода
      //передаем фокус на первое поле ввода
      this.$refs.number.focus();
    },
    savePhone() {
      //сохраняем данные, только если индекс имеется, т.е. >-1
      if (this.index > -1) {
        Object.assign(this.phones[this.index], this.newPhone);
        this.resetPhone(); //очищаем все поля
      }
    },
    deletePhone(item) {
      //ищем выбранный элемент массива и удаляем
      const index = this.phones.indexOf(item);
      this.phones.splice(index, 1);
    },
    setPhone(item) {
      //вычисляем индекс и сохраняем в переменной
      this.index = this.phones.indexOf(item);
      //для вывода данных в полях, выводим их в связных переменных
      this.newPhone = Object.assign({}, item);
      //включаем режим редактирования, появляются кнопки
      this.editmode = true;
    },
    resetPhone() {
      //тут обнуляем переменные и приводим все в исходное состояние
      this.newPhone = { number: "", name: "" }; // затираем переменную ввода
      this.$refs.number.focus();
      this.editmode = false;
      this.index = -1;
    }
  }
};
</script>