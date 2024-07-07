// import BaseTable from './baseTable.vue'
// import {queryPage} from "@/api/api/userApi";
//
// export default {
//     data() {
//         return {
//             tableData: [],
//             pageOption: {
//                 total: 0,
//                 pageSize: 10,
//                 pageNum: 1,
//             },
//             multipleSelection: []
//         }
//     },
//     components: {
//         BaseTable,
//     },
//     methods: {
//         init(val) {
//             queryPage()
//         },
//         handleSizeChange(val) {
//             this.pageOption.pageSize = val;
//             this.pageOption.pageNum = 1;
//             this.init({
//                 pageNum: 1,
//                 pageSize: val
//             })
//         },
//         handleCurrentChange(val) {
//             this.pageOption.pageNum = val;
//             this.init({
//                 pageNum: val,
//                 pageSize: this.pageOption.pageSize
//             })
//         },
//         handleSelectionChange(val) {
//             this.multipleSelection = val;
//         }
//     }
// }