'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import Link from 'next/link';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  subject: z.string().min(5, {
    message: 'Subject must be at least 5 characters.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
});

// Read the Google Apps Script URL from environment variables
const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || '';

export default function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const handleSubmit = async (values) => {
    const scriptUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;

    if (!scriptUrl) {
      console.error("Google Apps Script URL is not defined.");
      toast({
        title: "Configuration Error",
        description: "The form submission endpoint is not configured.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);

      toast({
        title: "Success",
        description: "Your message has been sent successfully!",
        variant: "success",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Submission Failed",
        description: "Failed to send your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="container mx-auto section-padding">
      <h2 className="text-3xl font-bold text-center mb-12">Get In Touch</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Contact Info & Socials */}
         <div>
           <Card className="glassmorphism p-6 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
                <p className="text-muted-foreground mb-6">
                  Feel free to reach out via email or connect with me on social media. I&apos;m always open to discussing new projects, creative ideas, or opportunities.
                </p>
                <div className="space-y-3 mb-8">
                   <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    {/* TODO: Replace with actual email */}
                    <a href="mailto:your.Pradeep2002km@gmail.com" className="text-foreground hover:text-primary transition-colors">Gmail</a>
                  </div>
                   <div className="flex items-center space-x-3">
                    <Linkedin className="h-5 w-5 text-primary" />
                     {/* TODO: Replace with actual LinkedIn profile */}
                    <a href="https://www.linkedin.com/in/pradeep-rathor-439133210/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">LinkedIn Profile</a>
                  </div>
                   <div className="flex items-center space-x-3">
                    <Github className="h-5 w-5 text-primary" />
                     {/* TODO: Replace with actual GitHub profile */}
                    <a href="https://github.com/Pradeep1519" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">GitHub Profile</a>
                  </div>
                 </div>
               </div>
              <div className="flex space-x-4 mt-auto">
                <Button variant="ghost" size="icon" asChild>
                   {/* TODO: Replace with actual LinkedIn profile */}
                  <Link href="https://www.linkedin.com/in/your-linkedin-profile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin className="h-6 w-6" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                   {/* TODO: Replace with actual GitHub profile */}
                  <Link href="https://github.com/your-github-profile" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Github className="h-6 w-6" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                   {/* TODO: Replace with actual email */}
                  <Link href="mailto:your.email@example.com" aria-label="Email">
                    <Mail className="h-6 w-6" />
                  </Link>
                </Button>
              </div>
           </Card>
          </div>

         {/* Contact Form */}
         <div>
           <Card className="glassmorphism p-6">
             <CardHeader className="p-0 mb-4">
                <CardTitle className="text-2xl">Send me a message</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} className="bg-background/80" disabled={isSubmitting}/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your.email@example.com" {...field} className="bg-background/80" disabled={isSubmitting}/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="Subject of your message" {...field} className="bg-background/80" disabled={isSubmitting}/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Your message..."
                              rows={5}
                              {...field}
                              className="bg-background/80"
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full transition-transform hover:scale-105 shadow-lg" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                        <Send className="mr-2 h-4 w-4" />
                      )}
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
           </Card>
          </div>
       </div>
    </section>
  );
}
