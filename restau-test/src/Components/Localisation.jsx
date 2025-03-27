import React from 'react';
const Localisation = () => {
    return (
        <>
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={ { backgroundImage: `url('https://img.freepik.com/photos-gratuite/homme-debout-devant-plaque-legumes_417767-135.jpg?t=st=1741180646~exp=1741184246~hmac=2e084b895b54726d409815950541fce3a4a5ec7545d9a7653acd271a2f41e36f&w=740')`, zIndex: -1 }}
      />

      <div className="fixed inset-0  opacity-80 z-0" />
        <section className="relative z-10 bg-transparent w-screen h-screen">
        <div className=' z-20 h-full'>
        <iframe 
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.7757328917933!2d-7.642119599999999!3d33.5851717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d2e7e26cc87b%3A0xe00011f67a952807!2sRue%20El%20Kadi%20Lass%20Maarif%2C%20Dar-el-Beida%2020250!5e0!3m2!1sfr!2sma!4v1741563362338!5m2!1sfr!2sma" 
    className="w-full h-[70%] border-0" 
    allowFullScreen
    loading="lazy" 
    referrerPolicy="no-referrer-when-downgrade">
</iframe>

        </div>
        </section>
        
        </>
       
       
    )

}

export default Localisation;