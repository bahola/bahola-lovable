
import React from 'react';
import { Stethoscope, Pill } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const AboutSection = () => {
  return (
    <section className="py-16 bg-bahola-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-bahola-neutral-800 mb-6">About Bahola Labs</h2>
            <p className="text-bahola-neutral-700 mb-4">
              Bahola Labs is dedicated to providing the highest quality homeopathic remedies, backed by scientific research and traditional knowledge. Our mission is to make homeopathy accessible and trustworthy for everyone.
            </p>
            <p className="text-bahola-neutral-700 mb-6">
              With over two decades of experience, our team of expert homeopaths and pharmacists ensure that every remedy meets the strictest quality standards, giving you confidence in your health choices.
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-bahola-blue-100 flex items-center justify-center mr-4">
                  <Stethoscope size={24} className="text-bahola-blue-500" />
                </div>
                <div>
                  <p className="font-bold">Expert Homeopaths</p>
                  <p className="text-sm text-bahola-neutral-600">Qualified specialists</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-bahola-blue-100 flex items-center justify-center mr-4">
                  <Pill size={24} className="text-bahola-blue-500" />
                </div>
                <div>
                  <p className="font-bold">Quality Assured</p>
                  <p className="text-sm text-bahola-neutral-600">Strict quality control</p>
                </div>
              </div>
            </div>
            <Button className="btn-bahola">
              Learn More About Us
            </Button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img 
              src="/placeholder.svg" 
              alt="Bahola Labs Laboratory" 
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
