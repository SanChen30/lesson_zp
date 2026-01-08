import Button from './components/Button.jsx';
import AnotherButton from './components/AnotherButton.jsx';

export default function App() {
  return (
    <>
    {/* 组件，是html,css,js的集合，解决某个需求
        组件化思想，可复用
    */}
      <Button />
    {/* 多人协作的时候，bug，产生冲突
        我们怎么不影响别人
        也不受别人的影响
    */}
      <AnotherButton />
    </>
  )
}