<template>
  <Layout>
    <Layout
      style="height: calc(100vh - 60px);"
      :style="{margin: '0px', background: '#fff', minHeight: '220px',
         backgroundImage:'url(http://114.55.93.118/group1/M00/00/00/rBA7015hBzqATVEgAAGCweLpcpo381.jpg)',
         backgroundRepeat:'no-repeat',backgroundSize:'100% 100%',
          }"
    >
      <Layout class="backs"></Layout>
      <div class="intbutton"  @click="go">
         <Poptip content="中心介绍" trigger="hover" class="arrow" placement="left" >
               
            </Poptip>
         
      </div>
    
      <div class="texts">
        <p style="position: relative; font-size:65px;">上海大学写作中心</p>
        <!-- <p style=" position: relative;font-size:50px;">国际学术交流写作中心</p> -->
        <p
          style=" position: relative;font-size:45px;margin-top:10px"
        >SHU Writing Center</p>
        <p style="  position: relative;top:30px;font-size:30px;">一站式写作教学、写作服务、写作科研的平台</p>
        <!-- <p style ="position: relative; font-size:50px;top:50px">上海大学</p>
          <p style=" position: relative;top:95px;font-size:50px;">国际学术交流写作中心</p>
          <p style=" position: relative;top:135px;font-size:23px;">Writing Lab for International Academic Exchange</p>
        <p style="  position: relative;top:195px;font-size:20px;">一站式英语写作教学、写作服务、写作科研的平台</p> -->
      </div>
    </Layout>
    <div>
        <div id="section1">
          <h3>上海大学写作中心</h3>
          <h3 style="font-size: 28px; color: rgb(36, 80, 134); ">SHU Writing Center</h3>
          <p style="text-align: left; text-indent: 2em; color: #333;">{{introduce}}</p>
          <p style="text-align: left; text-indent: 2em; color: #333;"><em style="font-weight:bold">{{introduce1}}</em></p>
          <p style="text-align: left; text-indent: 2em; color: #333;">{{introduce11}}</p>
        </div>
        <div class="section2">
          <h3>服务内容/服务体系</h3>
          <h3>service content / service system</h3>
          <p style="text-align: left; text-indent: 2em; color: #fff;">{{introduce2}}</p>
      
          <div id="works">
            <div class="container">
              <!-- Container -->
              <div class="row">
                <div class="portfolio-items">
                  <div class="col-sm-6">
                    <div class="portfolio-item">
                      <div class="hover-bg">
                        <div class="hover-text">
                          <h4>专家问诊</h4>

                          <p>“专家问诊”是上海大学写作中心聘请的海内外资深专家为学生提供的一对一指导服务。</p>
                          <div class="clearfix"></div>
                        </div>
                        <span>专家问诊</span>
                        <img src="@/common/img/portfolio/onebyone.jpg" class="img-responsive" alt="Project Title">
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-3 col-lg-3 web">
                    <div class="portfolio-item">
                      <div class="hover-bg">
                        <div class="hover-text">
                          <h4>同伴辅导</h4>
                          <p>“同伴辅导”是上海大学写作中心筛选并培训的高年级硕博研究生，通过与学生面对面沟通，帮助解决其写作层面的基础问题的个性化服务。</p>
                          <div class="clearfix"></div>

                        </div>
                        <span>同伴辅导</span>
                        <img src="@/common/img/portfolio/friend.jpg" class="img-responsive" alt="Project Title">
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="portfolio-item">
                      <div class="hover-bg">
                        <div class="hover-text">
                          <h4>信息素养培训</h4>
                          <p>“信息素养培训”是图书馆馆员针对全校师生开展不同层次和类型的专题讲座，包括数据库检索与利用、文献管理与写作工具、学术工具利用，以及写作规范等。</p>
                          <div class="clearfix"></div>

                        </div>
                        <span>信息素养培训</span>
                        <img src="@/common/img/portfolio/train.jpg" class="img-responsive" alt="Project Title">
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-3 col-lg-3 web">
                    <div class="portfolio-item">
                      <div class="hover-bg">
                        <div class="hover-text">
                          <h4>英语写作工作坊</h4>
                          <p>“英语写作工作坊”是由外国语学院资深教师滚动开展的初、中、高级的英语写作辅导，每个工作坊持续三周，小班教授，每月一次。</p>
                          <div class="clearfix"></div>
                        </div>
                        <span>英语写作工作坊</span>
                        <img src="@/common/img/portfolio/work.jpg" class="img-responsive" alt="Project Title">
                      </div>
                    </div>
                  </div>
                  

                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="section5">
          <h3>工作团队</h3>
          <h3 style="margin-bottom:50px">work team</h3>

          <div id="hero-slides">
            <div id="slides-cont">
            
              <div id="slides">
                <div class="slide" id="cehua">
                  <div class="number">策划</div>
                  <div class="body">
                
                    <div class="headline">策划部</div>
                      <div class="link"><p>调研师生需求，形成活动策划；对接其他部门，了解现有资源和限制条件，推进策划实现。</p></div>
                      
                  </div>
                </div>
                <div class="slide" id="lianluo">
                  <div class="number">联络</div>
                  <div class="body">
                   
                    <div class="headline">联络部</div>  
                    <div class="link"><p>联合师生，构建桥梁，优化预约服务，推进网站预约建设。</p></div>
                      
                  </div>
                </div>
                <div class="slide" id="zhixing">
                  <div class="number">执行</div>
                  <div class="body">
                    
                    <div class="headline">执行部</div>
                      <div class="link"><p>对接各部门的策划方案，根据实际情况执行线下活动，监控活动质量。</p></div>
                      
                  </div>
                </div>
                <div class="slide" id="xuanchuan">
                  <div class="number">宣传</div>
                  <div class="body">
                 
                    <div class="headline">宣传部</div>
                      <div class="link"><p>抓好中心品牌建设，实时撰写新闻稿和微信推送，发布有效信息，提升写作中心的知名度和影响力。</p></div>
                      
                  </div>
                </div>
                <div class="slide" id="shiju">
                  <div class="number">视觉</div>
                  <div class="body">
                 
                    <div class="headline">视觉部</div>
                      <div class="link"><p>利用图片、视频等新媒体方式，辅助建设微信公众号平台，提升写作中心的受众参与度。</p></div>
                      
                  </div>
                </div>
              
              </div>
              
            </div>
          </div>
        </div>
        
        <div id="section3">
          <h3>写作交流</h3>
          <h3>communication</h3>
          <Row >
            <Col span="6" offset="2">
          
              <p>
                <img src="@/common/images/q1.jpg" style="width:100%;height:100%;" />
              <h4>调动师生写作热情</h4>
              </p>
            </Col>
            <Col span="6" offset="1">
              <p>
                <img src="@/common/images/q2.jpg" style="width:100%;height:100%;" />
              <h4>面对面方式传授写作经验</h4>
              </p>
            </Col>
            <Col span="6" offset="1">
              <p>
                <img src="@/common/images/q3.jpg" style="width:100%;height:100%;" />
              <h4>分享实用的写作技巧</h4>
              </p>
            </Col>
          </Row>
        </div>        
        <div class="section4">
          <h3>写作预约</h3>
          <h3>appointment</h3>
          <div class="appointment">
            <Steps>
              <Step status="process" title="申请预约" content="登录上海大学写作中心网站，申请想要预约的导师，上传自己想要被辅导的论文"></Step>
              <Step status="process" title="导师确认" content="导师根据论文质量和辅导方向，确认预约"></Step>
              <Step status="process" title="写作辅导" content="预约确认后，按照时间地点进行写作辅导"></Step>
              <Step status="process" title="完成辅导" content="辅导完成后，填写调查问卷，以便下次进行预约"></Step>
            </Steps>
          </div>
        </div>
     
    </div>
  </Layout>
</template>

<script>
export default {
 
  data() {
    return {
      identity:'',
        introduce:
        "   上海大学写作中心成立于2019年10月23日，由上海大学研究生院和上海大学图书馆联合发起，同时得到了上海大学外国语学院和上海大学期刊社大力支持的论文写作服务平台。",
        introduce1:'中心实体空间：位于上海大学宝山校区本部图书馆二楼东侧。',
        introduce11:'上海大学写作中心从学生自身需求出发，由学生自发组织管理，以“恪守学术道德、坚守学术诚信，服务学生写作需求”为宗旨，致力于提升学生的学术能力和写作水平。上海大学写作中心向学生传递学术规范，提升论文梳理与呈现能力，强化底线意识，是学校贯彻高水平大学建设、落实立德树人、促进研究生论文基础写作水平整体提升的重要平台。',
      introduce2:"上海大学写作中心秉承“提高学术写作水平是我们共同的努力”的理念，自成立以来，不断加强管理队伍建设，通过整合各方资源，基本形成了以“信息素养培训”、“英语写作工作坊”、“一对一辅导”三轮驱动的服务体系。其中尤以一对一辅导，即“专家问诊”和“同伴辅导”，作为本中心的特色王牌服务。",
      introduce3:"上海大学写作中心由上海大学研究生院直接指导，贯彻学生“自我管理、自我教育、自我服务、自我监督”理念，由学生组织和管理，成立了包括策划部、联络部、执行部、宣传部和视觉部等五大部门。",
      section1:
        "“一对一辅导”是上海大学写作中心聘请学科资深专家、在读博士为学生学术论文写作提供的一对一指导服务；",
      section2:
        "“信息素养培训”是图书馆馆员针对全校师生开展不同层次和类型的专题讲座，包括数据库检索与利用、文献管理与写作工具、学术工具利用，以及写作规范等。",
      section3:
        "“英语写作工作坊”是由外国语学院资深教师滚动开展的初、中、高级的英语写作辅导，每个工作坊持续三周，小班教授，每月一次。",
      section4:
        "上海大学写作中心是学校贯彻高水平大学建设，落实立德树人,中心借鉴UCLA洛杉矶分校写作中心模式，从学生自身实际需求出发,从学生自身实际需求出发,中心借鉴UCLA洛杉矶分校写作中心模式，从学生自身实际需求出发"
   
    };
  },
  methods: {
    
    go() {
      var element = document.getElementById("section1");
      element.scrollIntoView({ block: "start", behavior: "smooth" });
    },
    go2() {
      var element = document.getElementById("section3");
      element.scrollIntoView({ block: "start", behavior: "smooth" });
    },
    
    
  },
  mounted() {
    this.identity = localStorage.getItem("authority");
    
  }
};
</script>

<style lang="scss" scoped>
@import "./login";
@import "./style.css";
@import "./style2.css";
@import "./bootstrap.css";

</style>
<style>
.ivu-poptip-body-content-inner{
  font-size:24px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
</style>

