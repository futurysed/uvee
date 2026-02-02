
import React, { useState } from 'react';
import { Sidebar, SidebarBody, SidebarLink, useSidebar } from "@/components/ui/sidebar";
import { LayoutDashboard, Plus, CalendarDays, MapPin, Tag, DollarSign, Image, Settings, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Dashboard: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [experienceDialogOpen, setExperienceDialogOpen] = useState(false);
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const { toast } = useToast();

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Experiences",
      href: "/explore",
      icon: (
        <CalendarDays className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Services",
      href: "/services",
      icon: (
        <Tag className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "/settings",
      icon: (
        <Settings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "/",
      icon: (
        <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    }
  ];

  const handleExperienceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Experience Added",
      description: "The experience has been added successfully."
    });
    setExperienceDialogOpen(false);
  };

  const handleServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Service Added",
      description: "The service has been added successfully."
    });
    setServiceDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Logo />
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>

      <DashboardContent 
        onAddExperience={() => setExperienceDialogOpen(true)} 
        onAddService={() => setServiceDialogOpen(true)}
      />
      
      {/* Experience Dialog */}
      <Dialog open={experienceDialogOpen} onOpenChange={setExperienceDialogOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Experience</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new experience.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleExperienceSubmit} className="space-y-4">
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Experience name" required />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Detailed description of the experience" required />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="time" required />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Where will this take place?" required />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <select id="category" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm" required>
                    <option value="">Select category</option>
                    <option value="Wellness">Wellness</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Food">Food</option>
                    <option value="Culture">Culture</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Price</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input id="price" type="number" min="0" step="0.01" className="pl-10" placeholder="0.00" required />
                  </div>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="image">Upload Images</Label>
                <Input id="image" type="file" multiple accept="image/*" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="availableSpots">Available Spots</Label>
                  <Input id="availableSpots" type="number" min="1" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input id="duration" placeholder="e.g. 2 hours" required />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="isFree" className="h-4 w-4 rounded border-gray-300" />
                <Label htmlFor="isFree">Free Experience</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="includedInStay" className="h-4 w-4 rounded border-gray-300" />
                <Label htmlFor="includedInStay">Included in Stay</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setExperienceDialogOpen(false)}>Cancel</Button>
              <Button type="submit">Add Experience</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Service Dialog */}
      <Dialog open={serviceDialogOpen} onOpenChange={setServiceDialogOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new service.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleServiceSubmit} className="space-y-4">
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="serviceName">Name</Label>
                <Input id="serviceName" placeholder="Service name" required />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="serviceDescription">Description</Label>
                <Textarea id="serviceDescription" placeholder="Detailed description of the service" required />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="servicePrice">Price</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input id="servicePrice" type="number" min="0" step="0.01" className="pl-10" placeholder="0.00" required />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="serviceImage">Upload Images</Label>
                <Input id="serviceImage" type="file" multiple accept="image/*" />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="included">What's Included</Label>
                <Textarea id="included" placeholder="List what's included in this service" required />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="availability">Availability</Label>
                <Input id="availability" placeholder="e.g. Daily, On demand, etc." required />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="serviceCategory">Category</Label>
                <select id="serviceCategory" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm" required>
                  <option value="">Select category</option>
                  <option value="Transport">Transport</option>
                  <option value="Workspace">Workspace</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Wellness">Wellness</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setServiceDialogOpen(false)}>Cancel</Button>
              <Button type="submit">Add Service</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const Logo = () => {
  return (
    <Link
      to="/dashboard"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <img 
        src="/lovable-uploads/8e4b7965-e522-44d0-94e4-d5a0c125529b.png" 
        alt="Guide Nigel" 
        className="h-10"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Admin Dashboard
      </motion.span>
    </Link>
  );
};

const DashboardContent = ({ 
  onAddExperience, 
  onAddService 
}: { 
  onAddExperience: () => void, 
  onAddService: () => void 
}) => {
  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Manage your experiences and services</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Experiences</h2>
            <Button 
              onClick={onAddExperience} 
              className="bg-[#e4a53f] hover:bg-[#d09530] text-white"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Experience
            </Button>
          </div>
          <p className="text-sm text-gray-500 mb-4">Create and manage activities for your guests</p>
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <CalendarDays className="mr-2 h-4 w-4 text-gray-400" />
              <span>Organize date and time-specific events</span>
            </div>
            <div className="flex items-center text-sm">
              <MapPin className="mr-2 h-4 w-4 text-gray-400" />
              <span>Set specific locations for each experience</span>
            </div>
            <div className="flex items-center text-sm">
              <Tag className="mr-2 h-4 w-4 text-gray-400" />
              <span>Categorize experiences for easy discovery</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Services</h2>
            <Button 
              onClick={onAddService} 
              className="bg-[#2a544a] hover:bg-[#1e3d36] text-white"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Service
            </Button>
          </div>
          <p className="text-sm text-gray-500 mb-4">Create and manage services for your guests</p>
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <DollarSign className="mr-2 h-4 w-4 text-gray-400" />
              <span>Set pricing for each service</span>
            </div>
            <div className="flex items-center text-sm">
              <Image className="mr-2 h-4 w-4 text-gray-400" />
              <span>Add images to showcase your offerings</span>
            </div>
            <div className="flex items-center text-sm">
              <Tag className="mr-2 h-4 w-4 text-gray-400" />
              <span>Categorize services for easy browsing</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="p-4 border-b">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
                <CalendarDays className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">Sunset Yoga added</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
          </div>
          <div className="p-4 border-b">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3">
                <Tag className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">Scooter Rental updated</p>
                <p className="text-sm text-gray-500">Yesterday</p>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 mr-3">
                <Image className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">New images added to Community Dinner</p>
                <p className="text-sm text-gray-500">2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
