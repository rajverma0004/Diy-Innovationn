'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Github, Linkedin, Mail, Globe } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* About DIY Innovation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gray-900">About DIY Innovation</CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Empowering creators to build amazing projects
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-violet">
              <p>
                DIY Innovation is a platform dedicated to bringing creative DIY projects to life. 
                We believe in the power of hands-on learning and the joy of creating something unique. 
                Our platform connects makers, innovators, and DIY enthusiasts with high-quality project kits 
                and detailed instructions.
              </p>
              <p>
                Whether you're a beginner taking your first steps into the world of DIY or an experienced 
                maker looking for your next challenge, DIY Innovation has something for everyone.
              </p>
            </CardContent>
          </Card>

          {/* Creator Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">Meet the Creator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-full md:w-1/3">
                  <div className="aspect-square rounded-lg bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">RV</span>
                  </div>
                </div>
                <div className="w-full md:w-2/3 space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">Raj Verma</h3>
                  <p className="text-gray-600">
                    Full Stack Developer & DIY Enthusiast
                  </p>
                  <p className="text-gray-600">
                    As the creator of DIY Innovation, Raj combines his passion for technology 
                    and DIY projects to build a platform that makes creating easier and more 
                    accessible for everyone. With a background in full-stack development and 
                    a love for hands-on projects, he understands both the technical and 
                    creative aspects of DIY making.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <Link 
                      href="https://github.com/rajverma" 
                      target="_blank"
                      className="flex items-center gap-2 text-gray-600 hover:text-violet-600 transition-colors"
                    >
                      <Github className="h-5 w-5" />
                      <span>GitHub</span>
                    </Link>
                    <Link 
                      href="https://linkedin.com/in/rajverma" 
                      target="_blank"
                      className="flex items-center gap-2 text-gray-600 hover:text-violet-600 transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span>LinkedIn</span>
                    </Link>
                    <Link 
                      href="mailto:raj@diyinnovation.com"
                      className="flex items-center gap-2 text-gray-600 hover:text-violet-600 transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                      <span>Contact</span>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mission Statement */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-violet">
              <p>
                At DIY Innovation, our mission is to inspire creativity and empower individuals to 
                bring their ideas to life through DIY projects. We believe that everyone has the 
                potential to create amazing things, and we're here to provide the tools, resources, 
                and community support to make that happen.
              </p>
              <ul className="mt-4 space-y-2">
                <li>Provide high-quality DIY project kits</li>
                <li>Foster a community of makers and innovators</li>
                <li>Make DIY projects accessible to everyone</li>
                <li>Support sustainable and eco-friendly making</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
