import React from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function SwaggerEmbed({ toggleSwagger }) {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-90 z-50 flex justify-center items-center">
      {/* Close Button */}
      <button
        onClick={toggleSwagger}
        className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-red-600"
      >
        &times;
      </button>

      {/* Swagger UI Modal */}
      <div className="w-11/12 h-5/6 bg-white rounded-lg overflow-hidden shadow-lg relative">
        <div className="h-full overflow-y-auto">
          <SwaggerUI url="http://kl-erp-env.eba-taqxsvmb.us-east-1.elasticbeanstalk.com:2001/v3/api-docs" />
        </div>
      </div>
    </div>
  );
}
