export default function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl rounded-[2rem] border border-white/60 bg-white/80 p-8 shadow-glow">
      <h1 className="font-serif text-4xl text-ink">关于龙潭祈愿</h1>
      <div className="mt-6 space-y-5 text-base leading-8 text-ink/75">
        <p>
          「龙潭祈愿」是围绕福建省宁德市屏南县熙岭乡龙潭村打造的网页端民俗文化体验 MVP。用户可以通过乡建DAO数字游民身份登录，或以游客模式进入，写下一个愿望，选择一类龙潭在地祈愿方式，生成随机祈愿结果。
        </p>
        <p>
          产品聚焦龙潭古镇、溪流、古厝、四平戏、红粬黄酒等地方文化意象，生成海报与非链上数字纪念徽章，用于游客互动、社交传播和情绪陪伴。
        </p>
        <p>
          本项目不接入支付、不做链上资产、不提供真实算命或宗教服务，所有结果仅作为在地文化体验内容。
        </p>
      </div>
    </section>
  );
}
