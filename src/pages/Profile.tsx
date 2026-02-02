import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, MapPin, Calendar, Settings, LogOut, Heart, Star } from "lucide-react";

const Profile = () => {
    return (
          <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4 max-w-4xl">
                        <div className="mb-6">
                                  <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>h1>
                                  <p className="text-gray-600 mt-1">Manage your account and preferences</p>p>
                        </div>div>
                
                  {/* Profile Header */}
                        <Card className="p-6 mb-6 bg-white shadow-sm">
                                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                                              <Avatar className="w-24 h-24">
                                                            <AvatarFallback className="bg-purple-100 text-purple-600 text-2xl">
                                                                            <User className="w-12 h-12" />
                                                            </AvatarFallback>AvatarFallback>
                                              </Avatar>Avatar>
                                              
                                              <div className="flex-1 text-center md:text-left">
                                                            <h2 className="text-2xl font-semibold text-gray-900">Guest User</h2>h2>
                                                            <p className="text-gray-600 mt-1">Member since January 2026</p>p>
                                                            
                                                            <div className="mt-4 space-y-2">
                                                                            <div className="flex items-center justify-center md:justify-start gap-2 text-gray-700">
                                                                                              <Mail className="w-4 h-4" />
                                                                                              <span className="text-sm">guest@uvee.com</span>span>
                                                                            </div>div>
                                                                            <div className="flex items-center justify-center md:justify-start gap-2 text-gray-700">
                                                                                              <MapPin className="w-4 h-4" />
                                                                                              <span className="text-sm">Sri Lanka</span>span>
                                                                            </div>div>
                                                            </div>div>
                                              </div>div>
                                  
                                              <Button className="bg-purple-600 hover:bg-purple-700">
                                                            <Settings className="w-4 h-4 mr-2" />
                                                            Edit Profile
                                              </Button>Button>
                                  </div>div>
                        </Card>Card>
                
                  {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                  <Card className="p-4 bg-white shadow-sm">
                                              <div className="flex items-center gap-3">
                                                            <div className="p-3 bg-orange-100 rounded-lg">
                                                                            <Calendar className="w-6 h-6 text-orange-600" />
                                                            </div>div>
                                                            <div>
                                                                            <p className="text-2xl font-bold text-gray-900">5</p>p>
                                                                            <p className="text-sm text-gray-600">Bookings</p>p>
                                                            </div>div>
                                              </div>div>
                                  </Card>Card>
                        
                                  <Card className="p-4 bg-white shadow-sm">
                                              <div className="flex items-center gap-3">
                                                            <div className="p-3 bg-pink-100 rounded-lg">
                                                                            <Heart className="w-6 h-6 text-pink-600" />
                                                            </div>div>
                                                            <div>
                                                                            <p className="text-2xl font-bold text-gray-900">12</p>p>
                                                                            <p className="text-sm text-gray-600">Favorites</p>p>
                                                            </div>div>
                                              </div>div>
                                  </Card>Card>
                        
                                  <Card className="p-4 bg-white shadow-sm">
                                              <div className="flex items-center gap-3">
                                                            <div className="p-3 bg-blue-100 rounded-lg">
                                                                            <Star className="w-6 h-6 text-blue-600" />
                                                            </div>div>
                                                            <div>
                                                                            <p className="text-2xl font-bold text-gray-900">8</p>p>
                                                                            <p className="text-sm text-gray-600">Reviews</p>p>
                                                            </div>div>
                                              </div>div>
                                  </Card>Card>
                        </div>div>
                
                  {/* Upcoming Bookings */}
                        <Card className="p-6 mb-6 bg-white shadow-sm">
                                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Bookings</h3>h3>
                                  <div className="space-y-4">
                                              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                                            <div className="flex items-center gap-4">
                                                                            <div className="p-3 bg-orange-100 rounded-lg">
                                                                                              <Calendar className="w-5 h-5 text-orange-600" />
                                                                            </div>div>
                                                                            <div>
                                                                                              <p className="font-semibold text-gray-900">Sunset Yoga</p>p>
                                                                                              <p className="text-sm text-gray-600">Tomorrow, 6:00 PM</p>p>
                                                                            </div>div>
                                                            </div>div>
                                                            <Button variant="outline" size="sm">View Details</Button>Button>
                                              </div>div>
                                  
                                              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                                            <div className="flex items-center gap-4">
                                                                            <div className="p-3 bg-teal-100 rounded-lg">
                                                                                              <Calendar className="w-5 h-5 text-teal-600" />
                                                                            </div>div>
                                                                            <div>
                                                                                              <p className="font-semibold text-gray-900">Community Dinner</p>p>
                                                                                              <p className="text-sm text-gray-600">Friday, 7:30 PM</p>p>
                                                                            </div>div>
                                                            </div>div>
                                                            <Button variant="outline" size="sm">View Details</Button>Button>
                                              </div>div>
                                  </div>div>
                        
                                  <Button variant="link" className="mt-4 text-purple-600">
                                              View All Bookings →
                                  </Button>Button>
                        </Card>Card>
                
                  {/* Account Settings */}
                        <Card className="p-6 bg-white shadow-sm">
                                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Account Settings</h3>h3>
                                  <div className="space-y-3">
                                              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-50">
                                                            <User className="w-4 h-4 mr-3" />
                                                            Personal Information
                                              </Button>Button>
                                              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-50">
                                                            <Settings className="w-4 h-4 mr-3" />
                                                            Preferences
                                              </Button>Button>
                                              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-50">
                                                            <Heart className="w-4 h-4 mr-3" />
                                                            Saved Favorites
                                              </Button>Button>
                                              <Button variant="ghost" className="w-full justify-start text-red-600 hover:bg-red-50">
                                                            <LogOut className="w-4 h-4 mr-3" />
                                                            Log Out
                                              </Button>Button>
                                  </div>div>
                        </Card>Card>
                </div>div>
          </div>div>
        );
};

export default Profile;</div>
