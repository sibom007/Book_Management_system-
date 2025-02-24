import Header from '@/components/Header';
import React from 'react';

const About = () => {
    return (
        <div className="p-10">
            <Header name='About Us' />
            <div className='flex justify-between gap-10'>
                <div>
                    <h2 className="text-2xl font-semibold mt-6 mb-2">Our Mission</h2>
                    <p className="mb-4">
                        We strive to get as many people moving as possible. Our approach is inclusive, catering to everyone, regardless of their current fitness level.
                    </p>

                </div>
                <div>
                    <h2 className="text-2xl font-semibold mt-6 mb-2">Why Choose Us?</h2>
                    <p className="mb-4">
                        We offer a sustainable alternative to the popular &ldquo;No pain, No gain&rdquo; mantra. Our philosophy is that exercise should be enjoyable and beneficial, not painful.
                    </p>
                    <p className="mb-4">
                        We believe that exercise is medicine. When done right, it not only alleviates pain but also protects against it. Join us in our mission to promote a healthier lifestyle for all.
                    </p>
                </div>
            </div>


        </div>
    );
};

export default About;