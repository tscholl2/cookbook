package server

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/TylerBrock/colorjson"
	"github.com/tscholl2/cookbook/backend/pkg"
)

type middleware func(http.Handler) http.Handler

func applyMiddlewares(h http.Handler, middlewares ...middleware) http.Handler {
	for _, m := range middlewares {
		h = m(h)
	}
	return h
}

type ctxKey int

const (
	reqIDCtxKey = ctxKey(iota)
	logCtxKey
)

func getLoggingMap(r *http.Request) map[string]interface{} {
	return r.Context().Value(logCtxKey).(map[string]interface{})
}

func requestIDMiddleware() middleware {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ID := pkg.NewUUID()[:8]
			next.ServeHTTP(w, r.WithContext(context.WithValue(r.Context(), reqIDCtxKey, ID)))
		})
	}
}

func loggingMiddleware(logout *log.Logger, logerr *log.Logger) middleware {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ID, _ := r.Context().Value(reqIDCtxKey).(string)
			lw := &logWriter{ResponseWriter: w, code: 200}
			loggingMap := map[string]interface{}{
				"id":             ID,
				"time":           time.Now().UTC(),
				"user_agent":     r.UserAgent(),
				"remote_addr":    r.RemoteAddr,
				"host":           r.Host,
				"method":         r.Method,
				"uri":            r.RequestURI,
				"content_length": r.ContentLength,
			}
			start := time.Now()
			next.ServeHTTP(lw, r.WithContext(context.WithValue(r.Context(), logCtxKey, loggingMap)))
			stop := time.Now()
			loggingMap["latency_ms"] = int(start.Sub(stop).Seconds() / 1000)
			loggingMap["code"] = lw.code
			loggingMap["response_length"] = lw.bytesWritten
			if err, ok := loggingMap["error"]; ok && err != nil {
				logerr.Printf("req %s: %+v", ID, err)
				loggingMap["error"] = fmt.Sprintf("%+v", err)
			}
			b, _ := json.Marshal(loggingMap)
			var v interface{}
			json.Unmarshal(b, &v)
			f := colorjson.NewFormatter()
			f.Indent = 2
			b, _ = f.Marshal(v)
			logout.Print(string(b))
		})
	}
}

type logWriter struct {
	http.ResponseWriter
	code         int
	bytesWritten int
}

func (w *logWriter) WriteHeader(code int) {
	w.code = code
	w.ResponseWriter.WriteHeader(code)
}

func (w *logWriter) Write(p []byte) (int, error) {
	n, err := w.ResponseWriter.Write(p)
	w.bytesWritten += n
	return n, err
}
