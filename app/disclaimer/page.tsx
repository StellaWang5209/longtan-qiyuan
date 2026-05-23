import { DISCLAIMER_TEXT } from "@/lib/constants";

export default function DisclaimerPage() {
  return (
    <section className="mx-auto max-w-4xl rounded-[2rem] border border-white/60 bg-white/80 p-8 shadow-glow">
      <h1 className="font-serif text-4xl text-ink">免责声明</h1>
      <p className="mt-6 text-lg leading-8 text-ink/75">{DISCLAIMER_TEXT}</p>
      <div className="mt-8 space-y-4 text-sm leading-7 text-ink/70">
        <p>本项目会随机生成不同签级与签文，仅用于娱乐、民俗文化体验、游客互动和情绪陪伴。</p>
        <p>本项目不提供命运预测、宗教承诺、医疗建议、法律建议或投资建议。</p>
        <p>本项目中的徽章为非链上数字纪念徽章，不是 NFT，不可交易，也不代表任何金融权益或凭证。</p>
      </div>
    </section>
  );
}
