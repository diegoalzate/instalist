/**
 * Error Boundary
 *
 * - used by top level App
 * - catch JS errors and display
 */

 import React, { Component, ReactNode } from "react";

 interface PropsInterface {
    children?: ReactNode;
 }
 
 interface StateInterface {
   hasError: Boolean;
   error?: Error | null;
   info?: object;
 }
 
 class ErrorBoundary extends Component<PropsInterface, StateInterface> {
   state = { hasError: false, error: null, info: {} };
 
   componentDidCatch(error: Error | null, info: object) {
     this.setState({ hasError: true, error, info });
   }
 
   render() {
     if (this.state.hasError) {
       return <h1>{JSON.stringify(this.state.info)}</h1>;
     }
     return this.props.children;
   }
 }
 
 export default ErrorBoundary;
 