<template>
  <div :class="datepCss.dateMonthBox">
    <input  v-show="!datedepend" type="text"  :class="[classname,datepCss.dateMonthInput]"  :value="value | dateformate formate">
    <span   v-show="!datedepend" @click="changePickerMain" :class="datepCss.showBtn">点我</span>
    <div :class="datepCss.attachoper" v-show="showDateMonth">
        <div :class="datepCss.coverPicker"   @click="changePickerMain" ></div>
        <div :class="datepCss.attachIn">
              <div :class="datepCss.attachMonth">
                <span v-for="mo in monthsArayy" @click="attachClickHandler" :month="mo.value" :class="mo.active? mo.active : ''">
                      {{ mo.name }}
                </span>
              </div>

              <div :class="datepCss.attachYear">
                <span v-for="ye in yearsArayy" @click="attachClickHandler" :year="ye.value" :class="ye.active? ye.active : ''">
                      {{ ye.value }}
                </span>
                <span :class='datepCss.yearOper'>
                      <button type="button" name="button" @click="prevAction">向前</button>
                      <button type="button" name="button" @click="nextAction">向后</button>
                </span>
              </div>
        </div>
        <div :class="datepCss.attachFooter">
             <button type="button" name="button" @click="curMonthAction">当月</button>
             <span :class='datepCss.btnBoxer'>
                    <button type="button" name="button"  @click="confirmAction">确定</button>
                    <button type="button" name="button"  @click="cancelAction">取消</button>
             </span>
        </div>
    </div>
  </div>
</template>

<script>
import datepCss from "./dateMonth.css"
export default {
  props:{
      datedepend:{
          type: Boolean,
          default: false
      },
      showDateMonth:{
        type: Boolean,
        default: false
      },
      classname:{
        type: String
      },
      value:{
        type: Date,
        default: () => new Date()
      },
      formate:{
        type:String,
        default: () => 'yyyy-mm'
      },
      startdate:{
          type:Date,
          default:() => new Date(1970,1,1)
      },
      stopdate:{
          type:Date,
          default: () => new Date(2100,1,1)
      }
  },
  data: function () {
    return {
      datepCss,
      // showDateMonth: false,
      dayCaption:["周日","周一","周二","周三","周四","周五","周六"],
      tplDate: this.value,
      year: this.value.getFullYear()
    }
  },
  computed: {
    monthsArayy() {
      let month =  this.value.getMonth();
      let monthArry = [{name:"一月", value:0}, {name:"二月", value:1},{name:"三月", value:2},{name:"四月", value:3},{name:"五月", value:4},{name:"六月", value:5},
                       {name:"七月", value:6},{name:"八月", value:7},{name:"九月", value:8},{name:"十月", value:9},{name:"十一月", value:10},{name:"十二月", value:11}];
      let Year = this.tplDate.getFullYear();
      // let Month = this.tplDate.getMonth();
      for (var i = 0; i < monthArry.length; i++) {
          var  one = monthArry[i];
          if(Year < this.startdate.getFullYear() || Year > this.stopdate.getFullYear()) one.active = this.datepCss.closeDay
          else if(Year == this.startdate.getFullYear() && one.value < this.startdate.getMonth()) one.active = this.datepCss.closeDay
          else if(Year == this.stopdate.getFullYear() && one.value > this.stopdate.getMonth()) one.active = this.datepCss.closeDay
          else if(one.value == month) one.active = this.datepCss.oneActive

      }

      return monthArry;
    },

    yearsArayy() {
      let year = this.tplDate.getFullYear() + "";
      // 构造year 数组 以0 - 9
      let preStr = year.slice(0,3);
      let lastKey = year.slice(3)*1;
      let yearArry = [];
      for(var i =0; i < lastKey; i++) {
        let cy = (preStr +  i)*1;
        if(cy < this.startdate.getFullYear() || cy > this.stopdate.getFullYear()) yearArry.push({value: cy, active:this.datepCss.closeDay})
        else  yearArry.push({value: cy})
      }
      if(year == this.year) yearArry.push({value: year, active:this.datepCss.oneActive})
      else {
        if(year*1 < this.startdate.getFullYear() || year*1 > this.stopdate.getFullYear()) yearArry.push({value: year, active:this.datepCss.closeDay})
        else  yearArry.push({value: year})
      }
      for(var i =lastKey+1; i < 10; i++) {
        let cy = (preStr +  i)*1;
        if(cy < this.startdate.getFullYear() || cy > this.stopdate.getFullYear()) yearArry.push({value: cy, active:this.datepCss.closeDay})
        else  yearArry.push({value: cy})
      }
      return yearArry
    }
  },
  ready: function () {},
  attached: function () {},
  methods: {
    changePickerMain() {
        this.tplDate = this.value;
        this.year  = this.tplDate.getFullYear();
        this.showDateMonth = !this.showDateMonth;
    },
    attachClickHandler(e) {
      let target = $(e.target);
      if(target.is("."+this.datepCss.closeDay)) return false;
      target.siblings().removeClass(this.datepCss.oneActive);
      target.addClass(this.datepCss.oneActive);
      let year = target.attr("year");
      if(year) {
        this.year = year;
        this.tplDate = new Date(year, this.tplDate.getMonth(), 1);
      }
    },

    curMonthAction(){
        let curDate = new Date();
        this.value = new Date(curDate.getFullYear(), curDate.getMonth(), 1);
        this.changePickerMain();
    },

    confirmAction(){
      let target = $(this.$el);
      let monObj = target.find("."+ this.datepCss.attachMonth + " ." + this.datepCss.oneActive);
      let yearObj = target.find("."+ this.datepCss.attachYear + " ." + this.datepCss.oneActive);
      if(monObj.length == 0 || yearObj.length == 0) {
          this.changePickerMain();
          return false;
      }
      let month = monObj.attr("month");
      let year = yearObj.attr("year");
      this.value = new Date(year, month, 1);
      this.changePickerMain();
    },

    cancelAction(){
      this.tplDate = this.value;
        this.showDateMonth = false;
    },

    prevAction(){
        let tpYear = this.tplDate.getFullYear();
        let tpMonth = this.tplDate.getMonth();
        let newYear = tpYear - 10;
        this.tplDate = new Date(newYear, tpMonth, 1);
    },
    nextAction(){
        let tpYear = this.tplDate.getFullYear();
        let tpMonth = this.tplDate.getMonth();
        let newYear = tpYear + 10;
        this.tplDate = new Date(newYear, tpMonth, 1);
    }
  },
  components: {}
}
</script>
