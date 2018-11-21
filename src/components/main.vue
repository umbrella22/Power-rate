<template>
  <div>
    <div class="head">电费计算器</div>
    <div class="title">
      <span class="tite-content">用电器名称</span>
      <span class="tite-content">功率</span>
      <span class="tite-content">使用时间</span>
    </div>
    <div class="listcss">
      <transition-group name="slide-fade">
        <div v-for="(item,index) in list" :key="index" class="list">
          <span>{{item.name}}</span>
          <span>{{item.power}}瓦</span>
          <span>{{item.time}}小时</span>
          <div class="img">
            <div class="el-icon-close" @click="dele(index)"></div>
          </div>
        </div>
      </transition-group>
    </div>
    <el-dialog title="请输入信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">

        <el-form-item label="电费（元/每度）：" :label-width="formLabelWidth" v-if="list == ''">
          <el-input v-model="form.pic" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电器名称：" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电器功率（瓦）：" :label-width="formLabelWidth">
          <el-input v-model="form.power" auto-complete="off">瓦</el-input>
        </el-form-item>
        <el-form-item label="电器使用时间（小时）：" :label-width="formLabelWidth">
          <el-input v-model="form.time" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <div class="picplus">
      共计：
      <span class="picplus-pic">{{picnum}}元</span>
    </div>
    <el-button type="primary" icon="el-icon-edit-outline" circle class="button" @click="open"></el-button>
  </div>
</template>

<script>
import Velocity from "velocity-animate";
export default {
  name: "main",
  data() {
    return {
      dialogFormVisible: false,
      dialogTableVisible: false,
      form: {
        name: "",
        power: "",
        pic: "",
        time: ""
      },
      list: [],
      piclist: [],
      picnum: 0,
      formLabelWidth: "167px"
    };
  },
  methods: {
    open() {
      this.dialogFormVisible = true;
    },
    confirm() {
      let num = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
      if (
        num.test(this.form.power) &&
        num.test(this.form.pic) &&
        num.test(this.form.time)
      ) {
        this.dialogFormVisible = false;
        this.list.push(this.form);
        this.count();
        console.log(this.list);
        this.form = {
          name: "",
          power: "",
          time: "",
          pic: this.form.pic
        };
      } else {
        this.$message.error(
          "卟卟~错了喵，电器功率，使用时间和电费必须是正数哦"
        );
      }
    },
    count() {
      let num;
      num = this.form.power / 1000 * this.form.time * this.form.pic;
      num = num.toFixed(2);
      num = parseFloat(num);
      this.piclist.push(num);
    },
    dele(id) {
      console.log(id);
      this.list.splice(id, 1);
      this.piclist.splice(id, 1);
      console.log(this.piclist);
      if (this.piclist.length == 0) {
        this.picnum = 0;
      }
      this.$message({
        message: "删除成功喵~",
        type: "success"
      });
    }
  },
  watch: {
    piclist: function(newpiclist) {
      if (this.piclist.length != 0) {
        this.picnum = this.piclist.reduce(function(a, b) {
          return a + b;
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.head {
  width: 100%;
  text-align: center;
  line-height: 40px;
  height: 40px;
  background-color: rgba(64, 160, 255, 0.781);
  color: #ffffff;
}
.title {
  line-height: 40px;
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
}
.tite-content {
  flex: 1;
  text-align: center;
}
.button {
  position: absolute;
  top: 90%;
  left: 85%;
}

.list {
  padding: 0 2%;
  line-height: 50px;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;
  margin: 0.6rem 0.5rem;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
}
.listcss {
  padding: 2%;
}
span {
  flex: 1;
  text-align: center;
}
.picplus {
  position: absolute;
  top: 90%;
  left: 5%;
  line-height: 60px;
  padding-left: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.picplus-pic {
  color: red;
  margin-left: 20px;
  font-size: 20px;
  margin-right: 20px;
}
.slide-fade-enter-active {
  transition: all 0.6s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(800px);
}
</style>
