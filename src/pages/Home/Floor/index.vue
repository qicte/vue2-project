<template>
    <!--楼层-->
    <div class="floor">
        <div class="py-container">
            <div class="title clearfix">
                <h3 class="fl">{{ floorList.name }}</h3>
                <div class="fr">
                    <ul class="nav-tabs clearfix">
                        <li class="active" v-for="(navList, index) in floorList.navList" :key="index">
                            <a :href="navList.url" data-toggle="tab">{{ navList.text }}</a>
                        </li>

                    </ul>
                </div>
            </div>
            <div class="tab-content">
                <div class="tab-pane">
                    <div class="floor-1">
                        <div class="blockgary">
                            <ul class="jd-list">
                                <li v-for="(keywords, index) in floorList.keywords" :key="index">{{ keywords }}</li>
                            </ul>
                            <img :src="floorList.imgUrl" />
                        </div>
                        <div class="floorBanner">
                            <Carousel :list="floorList.carouselList"></Carousel>
                        </div>
                        <div class="split">
                            <span class="floor-x-line"></span>
                            <!-- slice不影响原数组 截取（start，end）不包括end  返回截取的新数组 -->
                            <div class="floor-conver-pit"
                                v-for="(recommendList, index) in floorList.recommendList.slice(0, 2)">
                                <img :src="recommendList" />
                            </div>
                        </div>
                        <div class="split center">
                            <img :src="floorList.bigImg" />
                        </div>
                        <div class="split">
                            <span class="floor-x-line"></span>
                            <div class="floor-conver-pit"
                                v-for="(recommendList, index) in floorList.recommendList.slice(2, 4)">
                                <img :src="recommendList" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import Swiper from 'swiper'
export default {
    name: 'Floor',
    props: ['floorList'],
    // // 此时的结构和数据已经完成  数据请求是在home里并把请求完的数据在floor的props接收了
    // mounted() {
    //     //new Swiper
    // }
}
</script>

<style scoped lang="less"> .floor {
     margin-top: 15px;

     .py-container {
         width: 1200px;
         margin: 0 auto;

         .title {
             .fl {
                 float: left;
                 color: #c81623;
                 font-size: 20px;
                 line-height: 30px;
                 margin: 9px 0;
                 font-weight: 700;
             }

             .fr {
                 float: right;

                 .nav-tabs {
                     margin: 10px 0 0;
                     display: inline-block;

                     li {
                         float: left;
                         line-height: 18px;

                         a {
                             padding-top: 1px;
                             font-weight: 400;
                             background-color: #fff;

                             &::after {
                                 content: "|";
                                 padding: 0 10px;
                             }
                         }

                         &:nth-child(7) {
                             a {
                                 &::after {
                                     content: "";
                                 }
                             }
                         }

                         &.active {
                             a {
                                 color: #e1251b;
                             }
                         }
                     }
                 }
             }
         }

         .tab-content {
             border-top: 2px solid #c81623;
             border-bottom: 1px solid #e4e4e4;

             .tab-pane {
                 .floor-1 {
                     height: 360px;
                     display: flex;

                     .blockgary {
                         width: 210px;
                         height: 100%;
                         background: #f7f7f7;

                         .jd-list {
                             padding: 15px 0;
                             overflow: hidden;

                             li {
                                 list-style-type: none;
                                 float: left;
                                 width: 40%;
                                 margin: 0 10px;
                                 border-bottom: 1px solid #e4e4e4;
                                 text-align: center;
                                 line-height: 26px;
                             }
                         }

                         img {
                             width: 100%;
                         }
                     }

                     .floorBanner {
                         width: 330px;
                         height: 100%;
                     }

                     .split {
                         width: 220px;
                         height: 100%;
                         position: relative;

                         .floor-x-line {
                             position: absolute;
                             background: #e4e4e4;
                             width: 220px;
                             height: 1px;
                             top: 180px;
                         }

                         .floor-conver-pit {
                             width: 100%;
                             height: 50%;

                             img {
                                 width: 100%;
                                 height: 100%;
                                 transition: all 400ms;

                                 &:hover {
                                     opacity: 0.8;
                                 }
                             }
                         }
                     }

                     .center {
                         border: 1px solid #e4e4e4;
                     }
                 }
             }
         }
     }
 }
</style>