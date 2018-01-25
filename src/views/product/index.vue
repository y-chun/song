<template>
  <div class="app-container">
    <div class="app-content">
      <div class="over-table">
        <el-button type="primary" icon="el-icon-edit" class="over-table-btn pull-right" size="large" @click="albumMessageModalState = true">专辑管理</el-button>
        <el-button type="primary" icon="el-icon-edit" class="over-table-btn pull-right button-clear-left" size="large" @click="addProduct('add')">新增</el-button>
        <el-button type="info" class="over-table-btn pull-right button-clear-left" size="large" plain @click="loadTableList">搜索</el-button>
        <el-input v-model="search" placeholder="请输入曲子名称或标签" size="large" class="over-table-input" />
      </div>
      <div class="app-table-box">
        <el-table :data="currentTableData" style="width: 100%" v-loading.body="listLoading" border stripe>
          <el-table-column prop="ID" label="ID" width="50">
          </el-table-column>
          <el-table-column prop="name" label="产品名称">
            <template slot-scope="scope">
              <div>
                <img src="../../assets/images/play.png" @click="playAudio(scope)" v-show="!scope.row['play']" class="pull-left table-play-size" />
                <img src="../../assets/images/pause.png" @click="pauseAudio(scope)" v-show="scope.row['play']" class="pull-left table-play-size" />
                <p class="pull-left song-name">{{scope.row.name}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="quote_song" label="引用歌曲">
            <template slot-scope="scope">
              <div>
                <img src="../../assets/images/play.png" @click="playQuoteAudio(scope)" v-show="!scope.row['playQuote']" class="pull-left table-play-size" />
                <img src="../../assets/images/pause.png" @click="pauseQuoteAudio(scope)" v-show="scope.row['playQuote']" class="pull-left table-play-size" />
                <p class="pull-left song-name">{{scope.row.quote_song}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="planner" label="策划人">
          </el-table-column>
          <el-table-column prop="album_name" label="专辑名称">
          </el-table-column>
          <el-table-column prop="operation" label="操作" width="237">
            <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="addProduct('edit',scope.row.id)">编辑</el-button>
                <el-button type="primary" size="mini" @click="checkNote(scope.row.id)">查看备注</el-button>
                <el-button type="primary" size="mini" @click="deleteProductFun(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="table-pagination">
        <el-pagination
          @size-change="handleSizeChange"
          :current-page.sync="currentPage"
          :page-sizes="pageSizes"
          :page-size="limit"
          layout="sizes, prev, pager, next"
          :total="total"
          style="float:right">
        </el-pagination>
      </div>
    </div>
    <InfoModal v-model="infoModalState" @changeModalState="changeInfoState" :modalLoading="infoLoading">
      <p v-html="note"></p>
    </InfoModal>
    <AddProductModal v-model="addProductModalState" @changeModalState="changeAddProductModalState" :type="addModalType" :albumList = "albumList" :songList = "songList" :id = "addID" />
    <AlbumMessageModal v-model="albumMessageModalState" @changeModalState="changeAlbumMessageModalState" />
    <audio src="" style="display:block" ref="audio"/>
  </div>
</template>

<script>
  import InfoModal from '@/components/InfoModal';
  import AddProductModal from './AddProductModal';
  import AlbumMessageModal from './AlbumMessageModal';
  import {
    getProductList,
    getProductNote,
    deleteProduct
  } from '@/api/song/product';
  import {
    messageInfo
  } from "@/utils/common"
  export default {
    components: {
      InfoModal,
      AddProductModal,
      AlbumMessageModal
    },
    data() {
      return {
        infoLoading: false,
        infoModalState: false,
        addProductModalState: false,
        albumMessageModalState: false,
        input: '',
        addModalType: 'add',
        dialogFormVisible: false,
        listLoading: true,
        note: '',
        tableData: [],
        currentPage: 1,
        pageSizes: [10, 20,30],
        sortMethod: data => data,
        limit: 10,
        albumList: [],
        songList: [],
        search: '',
        addID: '',
      };
    },
    mounted() {
      this.loadTableList();
    },
    computed: {
      total() {
        return this.tableData.length;
      },
      offset() {
        return this.limit * (this.currentPage - 1);
      },
      currentTableData() {
        const end = this.offset + this.limit;
        return this.sortMethod(this.tableData).slice(this.offset, end);
      }
    },
    watch: {
      tableData() {
        // 切换数据来源，分页重置
        // this.currentPage = 1;
      }
    },
    methods: {

      /**
       * 播放产品音频
       */
      playAudio(scope) {
        this.$refs['audio'].src = scope.row.audio_url;
        this.$refs['audio'].play();
        var list = this.tableData.map((item, i) => {
          if (item.id === scope.row.id) {
            item['play'] = true;
          } else {
            item['play'] = false;
          }
          item['playQuote'] = false;
          return item
        })
        this.tableData = list
      },

      /**
       * 暂停产品音频
       */
      pauseAudio(scope) {
        this.$refs['audio'].pause();
        var list = this.tableData.map((item, i) => {
          if (item.id === scope.row.id) {
            item['play'] = false;
          }
          return item
        })
        this.tableData = list
      },

      /**
       * 播放引用歌曲音频
       */
      playQuoteAudio(scope){
        this.$refs['audio'].src = scope.row.quote_audio_url;
        this.$refs['audio'].play();
        var list = this.tableData.map((item, i) => {
          if (item.id === scope.row.id) {
            item['playQuote'] = true;
          } else {
            item['playQuote'] = false;
          }
          item['play'] = false;
          return item
        })
        this.tableData = list
      },

      /**
       * 暂停引用歌曲音频
       */
      pauseQuoteAudio(scope){
        this.$refs['audio'].pause();
        var list = this.tableData.map((item, i) => {
          if (item.id === scope.row.id) {
            item['playQuote'] = false;
          }
          return item
        })
        this.tableData = list
      },

      addProduct(type, id) {
        this.addModalType = type;
        !!id ? this.addID = id : null
        this.changeAddProductModalState(true);
      },
      /**
       * 打开查看备注
       */
      checkNote(id) {
        this.changeInfoState(true);
        this.infoLoading = true;
        getProductNote({
          id: id
        }).then(res => {
          let arrNote = res.data.info.split("\n");
          this.note = arrNote.join("</br>");
          this.infoLoading = false;
        })
      },
      /**
       * 加载表格数据
       */
      loadTableList() {
        this.listLoading = true;
        this.currentPage = 1;
        this.$refs['audio'].pause();
        getProductList({
          search: this.search
        }).then(res => {
          this.listLoading = false;
          // this.search = '';
          this.tableData = [...res.data.tableData];
          this.albumList = [...res.data.album_list];
          this.songList = [...res.data.song_list];
        })
      },
      handleSizeChange(val) {
        this.limit = val;
        this.currentPage = 1;
      },
      /**
       * 删除数据
       */
      deleteProductFun(row) {
        this.$confirm(`您确定要删除曲目${row.name}吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteProduct({
            id: row.id
          }).then(res => {
            messageInfo.bind(this)('恭喜您，删除成功', 'success');
            this.loadTableList();
          }).catch(res => {
            messageInfo.bind(this)('删除失败', 'error');
          })
        })
      },
      /**
       * 修改备注窗口状态
       */
      changeInfoState(state) {
        this.infoModalState = state;
      },
      /**
       * 修改新增窗口状态
       */
      changeAddProductModalState(state, load) {
        this.addProductModalState = state;
        if (load) {
          this.loadTableList();
        }
      },
      changeAlbumMessageModalState(state) {
        this.albumMessageModalState = state;
        this.loadTableList();
      }
    }
  };
</script>

<style scoped>
  .line {
    text-align: center;
  }
  .app-table-box {
    background-color: #fff;
  }
  .app-content {
    background-color: #fff;
    padding: 15px;
    box-shadow: 0 0 4px #aaa;
  }
  .over-table-btn {
    margin: 10px 10px 10px 0px;
  }
  .pull-right {
    float: right;
  }
  .over-table {
    overflow: hidden;
  }
  .el-button+.el-button {
    margin-left: 5px;
  }
  .over-table-input {
    margin: 10px;
    width: 350px;
    float: right;
  }
  .table-pagination {
    margin-top: 10px;
    overflow: hidden;
  }
  .table-tag{
  margin-right:5px;
}
.song-name{
  margin-left:5px;
}
.table-play-size{
  width: 22px;
  height: 22px;
}
</style>

