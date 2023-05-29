import Navigation from "../../components/navBar";
import Image from 'next/image';

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100 text-black" style={{
      backgroundImage: 'background.jpg'
    }}>
      <Navigation />
      <div className="p-10 flex flex-col justify-center container">
        <span className="text-center font-bold text-2xl w-full">Proposito</span>
        <p className="text-justify text-lg pt-5">
          Facilitar a las empresas manufactureras y de servicios a costear sus actividades de una manera más rápida y sencilla, así como utilizar el modelo COCOMO para costeo de productos de software
        </p>
        <div className="flex flex-row gap-5 justify-center">
          <Image
            src="/background.jpg"
            className="pt-10"
            width={550}
            height={300}
            alt="Logo"
          />

        </div>

      </div>
    </div>
  )
}

export default Home;
