import React from 'react';

const FeatureItem = ({ icon, title, description }) => (
  <div className="flex flex-col justify-center">
    <div className="flex justify-center items-center px-7 bg-white shadow-sm h-[100px] rounded-[100px] w-[100px] max-md:px-5">
      <img loading="lazy" src={icon} alt="" className="w-10 aspect-square fill-purple-950" />
    </div>
    <div className="mt-1 text-base leading-5 text-center text-purple-950">
      {title} <br /> {description}
    </div>
  </div>
);

const Features = () => {
  const features = [
    { icon: "https://res.cloudinary.com/dn9wcfwr4/image/upload/v1721041452/Demo/Vector1_ykl8mo.png", title: "Long Dummy", description: "Text" },
    { icon: "https://res.cloudinary.com/dn9wcfwr4/image/upload/v1721041452/Demo/Vector2_bgtrii.png", title: "Long Dummy", description: "Text" },
    { icon: "https://res.cloudinary.com/dn9wcfwr4/image/upload/v1721042186/Demo/Vector3_zechqc.png", title: "Long Dummy", description: "Text" },
    { icon: "https://res.cloudinary.com/dn9wcfwr4/image/upload/v1721041454/Demo/Vector10_c5k2p0.png", title: "Long Dummy", description: "Text" },
    { icon: "https://res.cloudinary.com/dn9wcfwr4/image/upload/v1721041453/Demo/Vector4_kkpsrd.png", title: "Long Dummy", description: "Text" },
    { icon: "https://res.cloudinary.com/dn9wcfwr4/image/upload/v1721041454/Demo/Vector5_msf6xo.png", title: "Long Dummy", description: "Text" },
    { icon: "https://res.cloudinary.com/dn9wcfwr4/image/upload/v1721041454/Demo/Vector6_bqpjxa.png", title: "Long Dummy", description: "Text" },
    { icon: "https://res.cloudinary.com/dn9wcfwr4/image/upload/v1721041454/Demo/Vector7_fgp30t.png", title: "Long Dummy", description: "Text" },
    { icon: "https://res.cloudinary.com/dn9wcfwr4/image/upload/v1721041454/Demo/Vector8_d9oqtz.png", title: "Long Dummy", description: "Text" },
    { icon: "https://res.cloudinary.com/dn9wcfwr4/image/upload/v1721041454/Demo/Vector9_ntcjvq.png", title: "Long Dummy", description: "Text" },
  ];

  return (
    <section className="flex flex-col justify-center items-center self-center px-20 py-16 mt-40 max-w-full bg-amber-100 rounded-3xl shadow-lg w-[938px] max-md:px-5 max-md:mt-10">
      <h2 className="text-4xl font-bold text-center text-purple-950">Loreum Ispum</h2>
      <div className="flex flex-wrap gap-5 justify-center content-center mt-6 max-w-full w-[676px]">
        {features.map((feature, index) => (
          <FeatureItem key={index} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default Features;