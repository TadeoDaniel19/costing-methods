import CocomoAdvanced from "@/components/cocomoAdvance";
import CocomoBasic from "@/components/cocomoBasic";
import CocomoGeneric from "@/components/cocomoGeneric";
import CocomoIntermedate from "@/components/cocomoIntermedate";
import Navigation from "@/components/navBar";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

const CocomoOne = () => {
  const data = [
    {
      label: "Generico",
      value: "generic",
      desc: <CocomoGeneric />,
    },
    {
      label: "Básico",
      value: "basic",
      desc: <CocomoBasic />,
    },
    {
      label: "Intermedio",
      value: "intermedate",
      desc: <CocomoIntermedate />,
    },
    {
      label: "Detallado",
      value: "advanced",
      desc: <CocomoAdvanced />,
    },
  ];
  return (
    <div className="min-h-screen w-full bg-gray-100 text-black">
      <Navigation />
      <div className="container flex flex-col justify-center pt-10">
        <span className="text-center font-bold text-2xl w-full">Modelo COCOMO I</span>
        <p className="text-center text-lg pt-5">
          Modelo que permite estimar el costo, esfuerzo, y programar la hora de planificar una nueva actividad de desrrollo de software.
        </p>
      </div>
      <Tabs value="generic" className="container pt-10">
        <TabsHeader className="bg-orange-500 text-white">
          {data.map(({ label, value }) => (
            <Tab className=" text-black" key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody animate={{
          initial: { y: 250 },
          mount: { y: 0 },
          unmount: { y: 250 },
        }}>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  )
}

export default CocomoOne;
