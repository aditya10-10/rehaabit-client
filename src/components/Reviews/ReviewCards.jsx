const ReviewCards = ({ testimonials, sliderRef }) => {
  return (
    <div
      ref={sliderRef}
      className="mt-12 w-full overflow-x-auto scrollbar-hide"
    >
      <div className="flex gap-5">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[calc(33.33%-20px)] min-w-[300px]"
          >
            <div className="flex flex-col grow p-8 w-full bg-yellow-100 rounded-[32px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
              <p className="text-2xl leading-8 text-black max-md:max-w-full">
                {testimonial.quote}
              </p>
              <div className="flex gap-2 mt-8 max-md:flex-wrap">
                <div className="flex flex-1 gap-5 max-md:flex-wrap">
                  <img
                    loading="lazy"
                    src={testimonial.imageSrc}
                    alt={`${testimonial.name}'s profile`}
                    className="shrink-0 aspect-square w-[60px]"
                  />
                  <div className="flex flex-col flex-1 justify-center my-auto">
                    <p className="text-lg leading-7 text-black">
                      {testimonial.name}
                    </p>
                    <div className="flex gap-0.5 justify-center self-start mt-1">
                      {[...Array(5)].map((_, i) => (
                        <img
                          key={i}
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f0ccb9d1a7d8a897604381933b1e7538df860ec9ea0dfb4738edcbbf2aa64558?apiKey=14bc5a83475145d8890ac8c4aa074f6f&"
                          alt=""
                          className="shrink-0 w-4 aspect-square"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/3e4be5f92c9bfdd4409bbb5059fd1e560d251670f9cb2a103320b52747845964?apiKey=14bc5a83475145d8890ac8c4aa074f6f&"
                  alt=""
                  className="shrink-0 my-auto w-12 aspect-[1.33] fill-emerald-700"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewCards;
